import Link from 'next/link';
import React from 'react';

const NavBar = () => {
	return (
		<div className="flex bg-slate-200 p-5">
			<div className="mr-5">
				<Link href={'/'}>Navbar</Link>
			</div>
			<div>
				<Link href={'/admin'}>Admin</Link>
			</div>
		</div>
	);
};

export default NavBar;
