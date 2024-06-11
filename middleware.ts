// import middleware and export it as default
export { default } from 'next-auth/middleware';

// pass the paths to secure
export const config = {
	// *: zero or more params
	// +: one or more params
	// ?: zero or one params
	matcher: ['/users/:path*', '/admin/:id*', '/dashboard/:path*'],
};
