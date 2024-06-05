import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';

export function GET(request: NextRequest) {
	return NextResponse.json([
		{ id: 1, name: 'Juliana', price: 2.5 },
		{ id: 2, name: 'May', price: 3.5 },
	]);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	// validation using zod
	// use safeParse so as to receive error object
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });
	return NextResponse.json(
		{ id: 3, name: body.name, price: body.price },
		{ status: 201 }
	);
}
