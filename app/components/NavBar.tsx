'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

// client component because of the hook (useSession) and
const NavBar = () => {
	// assessing the user session on the client
	const { status, data: session } = useSession();

	return (
		<div className="flex bg-slate-200 p-5 space-x-3">
			<Link href={'/'}>Navbar</Link>
			<Link href={'/admin'}>Admin</Link>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'authenticated' && (
				<div>
					{session.user?.name} <Link href={'/api/auth/signout'}>Sign Out</Link>
				</div>
			)}
			{status === 'unauthenticated' && (
				// the signin is exposed to our next auth on api/auth/signin
				<Link href={'/api/auth/signin'}>Sign in</Link>
			)}
		</div>
	);
};

export default NavBar;
