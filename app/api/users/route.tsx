import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';

export function GET(request: NextRequest) {
	return NextResponse.json([
		{ id: 1, name: 'Juliana' },
		{ id: 2, name: 'John' },
	]);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	// validate
	const validation = schema.safeParse(body)
	if (!validation.success)
		return NextResponse.json(validation.error.errors[0], { status: 400 });
	return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
