import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// the authOptions will create a session which can be used on the server components
export const authOptions = {
	// add as many providers as you want here
	providers: [
		GoogleProvider({
			// add ! to notify typescrit that we definitely set the environments
			// this will make the warning that clientid or secret id undefined go away
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOODLE_CLIENT_SECRET!,
		}),
	],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
