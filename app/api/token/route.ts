import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// example of how to use the getToken function
// which return jwt payload used to encrypt the session info
export async function GET(request: NextRequest) {
	const token = await getToken({ req: request });
	return NextResponse.json(token);
}
