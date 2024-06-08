import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import client from '@/prisma/client';

export async function GET(request: NextRequest) {
	const allProducts = await client.product.findMany();
	return NextResponse.json(allProducts);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	// validation using zod
	// use safeParse so as to receive error object
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const isProductExist = await client.product.findUnique({
		where: {
			name: body.name,
		},
	});
	if (isProductExist) {
		return NextResponse.json(
			{ error: 'Product Already Exist' },
			{ status: 400 }
		);
	}

	const product = await client.product.create({
		data: {
			name: body.name,
			price: body.price,
		},
	});
	return NextResponse.json(product, { status: 201 });
}
