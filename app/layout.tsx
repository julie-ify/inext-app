import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/NavBar';
import AuthProvider from './auth/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Issue-Tracker',
	description: 'Helps track your project issues effectively',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-theme="winter">
			<body className={inter.className}>
				<AuthProvider>
					<NavBar />
					<main className="p-5">{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}
