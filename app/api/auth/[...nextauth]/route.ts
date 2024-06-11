import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import client from '@/prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// the authOptions will create a session which can be used on the server components
export const authOptions: NextAuthOptions = {
	// add as many providers as you want here
	// arrange the providers in a way you want them to display on the page
	// first one shows up above the others
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'user@example.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials, request) {
				if (!credentials?.email || !credentials.password) return null;

				const user = await client.user.findUnique({
					where: { email: credentials?.email },
				});
				if (!user) return null;

				const passwordMatch = bcrypt.compare(
					credentials.password,
					user.hashedPassword!
				);
				if (!passwordMatch) return null;

				return user;
			},
		}),
		GoogleProvider({
			// add ! to notify typescrit that we definitely set the environments
			// this will make the warning that clientid or secret id undefined go away
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOODLE_CLIENT_SECRET!,
		}),
	],
	// adapter so as to save user to the database
	adapter: PrismaAdapter(client),
	session: {
		strategy: 'jwt',
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
