import React from 'react';
import { sort } from 'fast-sort';

interface User {
	id: number;
	name: string;
	email: string;
}

interface Props {
	sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
	console.log(sortOrder);
	const API_URL = 'https://jsonplaceholder.typicode.com/users';
	// can fetch data directly from the server component without side effects
	const res = await fetch(API_URL, {
		// render on request, don't cache data
		cache: 'no-cache',
	});

	const users: User[] = await res.json();
	const ascSorted = sort(users).asc((u) => {
		if (typeof sortOrder === 'string' && sortOrder === 'name') return u.name;
		if (typeof sortOrder === 'string' && sortOrder === 'email') return u.email;
	});
	
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{ascSorted.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
