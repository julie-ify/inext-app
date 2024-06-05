import React, { Suspense } from 'react';
import UserTable from './UserTable';
import Link from 'next/link';

interface Props {
	searchParams: { sortOrder: string };
}

const UsersPage = ({ searchParams: { sortOrder } }: Props) => {
	return (
		<div>
			<h1>Users</h1>
			<Link href={'/users/new'} className="btn">
				New User
			</Link>
			{/* Suspense component was introduced in react 18 */}
			{/* Suspense comonent is used as fallback when component is fetching data */}
			<Suspense fallback={<p>Loading...</p>}>
				<UserTable sortOrder={sortOrder} />
			</Suspense>
		</div>
	);
};

export default UsersPage;
