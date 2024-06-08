import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
// this is used to import prismaclient from the client.ts from the prisma folder
import client from '@/prisma/client';
// Prisma object to retrieve some error handling properties
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
	const users = await client.user.findMany();
	return NextResponse.json(users);
}

// Create a user object
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		// validate using zod
		const validation = schema.safeParse(body);
		if (!validation.success)
			return NextResponse.json(validation.error.errors[0], { status: 400 });

		const user = await client.user.create({
			data: {
				name: body.name,
				email: body.email,
			},
		});
		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		// handles exceptions
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// check the error code to determine the error type
			// handles unique email constraint errors
			if (error.code === 'P2002') {
				return NextResponse.json(
					{ error: 'Invalid Email/Name' },
					{ status: 400 }
				);
			}
		}
		throw error;
	}
}
