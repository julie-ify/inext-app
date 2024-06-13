import client from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const schema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(3),
});

interface Body {
	name: string;
	email: string;
	password: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: Body = await request.json();
		const validation = schema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{ error: validation.error.errors },
				{ status: 400 }
			);
		}

		const user = await client.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (user) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 400 }
			);
		}

		const password = await bcrypt.hash(body.password, 10);
		const newUser = await client.user.create({
			data: {
				name: body.name,
				email: body.email,
				hashedPassword: password,
			},
		});
		const token = jwt.sign(
			{ id: newUser.id },
			process.env.NEXT_JWT_SECRET_KEY!,
			{
				expiresIn: 60 * 60 * 1,
			}
		);

		return NextResponse.json(
			{ email: newUser.email, name: newUser.name, token },
			{
				status: 201,
				headers: {
					'Set-Cookie': cookie.serialize('next-auth.session-token', token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						maxAge: 3600,
						path: '/',
					}),
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
	}
}
