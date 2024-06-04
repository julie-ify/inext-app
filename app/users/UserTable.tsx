import React from 'react';

interface User {
	id: number;
	name: string;
	email: string;
}

const UserTable = async () => {
	const API_URL = 'https://jsonplaceholder.typicode.com/users';
	// can fetch data directly from the server component without side effects
	const res = await fetch(API_URL, {
		// render on request, don't cache data
		cache: 'no-cache',
	});
	const users: User[] = await res.json();
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
					{users.map((user) => (
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
