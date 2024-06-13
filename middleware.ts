// import middleware and export it as default
export { default } from 'next-auth/middleware';

// pass the paths to secure
// when a user visit any of the pages in the matcher, middleware checks if they are authenticated
// if not, send them to the login page
export const config = {
	// *: zero or more params
	// +: one or more params
	// ?: zero or one params
	matcher: ['/users/:path*', '/admin/:id*', '/dashboard/:path*'],
};
