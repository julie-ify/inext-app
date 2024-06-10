import Link from 'next/link';
import React from 'react';

const NavBar = () => {
	return (
		<div className="flex bg-slate-200 p-5 space-x-3">
			<div>
				<Link href={'/'}>Navbar</Link>
			</div>
			<div> 
				<Link href={'/admin'}>Admin</Link>
			</div>
			<div>
				{/* the signin is exposed to our next auth on api/auth/signin  */}
				<Link href={'/api/auth/signin'}>Sign in</Link>
			</div>
		</div>
	);
};

export default NavBar;
