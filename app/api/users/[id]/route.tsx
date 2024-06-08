import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';
import client from '@/prisma/client';
import { Prisma } from '@prisma/client';

interface Props {
	params: { id: string };
}

// Fetch a single user
export async function GET(request: NextRequest, { params: { id } }: Props) {
	const idStringToInt = parseInt(id);
	const user = await client.user.findUnique({
		where: {
			id: idStringToInt,
		},
	});
	if (!user)
		return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
	return NextResponse.json(user);
}

// Update a user's object
export async function PUT(request: NextRequest, { params: { id } }: Props) {
	const body = await request.json();

	// validate using zod
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors[0], { status: 400 });

	// check if a user with that id exists
	const isUserExists = await client.user.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	if (!isUserExists) {
		return NextResponse.json({ error: 'User Not Found' }, { status: 400 });
	}

	// check if email exists, if true, do not allow them to update to an already existing email
	const isUniqueUser = await client.user.findUnique({
		where: {
			email: body.email,
		},
	});
	if (isUniqueUser) {
		return NextResponse.json({ error: 'Invalid Email' }, { status: 400 });
	}

	// otherwise, update the resource
	const user = await client.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name: body.name ?? isUserExists.name,
			email: body.email ?? isUserExists.email,
			followers: body.followers ?? isUserExists.followers,
		},
	});

	if (!user)
		return NextResponse.json({ error: 'user not found' }, { status: 404 });

	return NextResponse.json(user);
}

// // Delete a user's object
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
	try {
		// check if a user with that id exists
		const isUserExist = await client.user.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		if (!isUserExist) {
			return NextResponse.json({ error: 'User Not Found' }, { status: 400 });
		}

		await client.user.delete({
			where: {
				id: parseInt(id),
			},
		});
		return NextResponse.json({ message: 'deleted' }, { status: 200 });

	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				return NextResponse.json({ error: 'User Not Found' }, { status: 400 });
			}
		}
		throw error;
	}
}
