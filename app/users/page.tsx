import React from 'react';

// define interface for user data
interface User {
	id: number;
	name: string;
}

const UsersPage = async () => {
	const API_URL = 'https://jsonplaceholder.typicode.com/users'
	// can fetch data directly from the server component without side effects
	const res = await fetch(API_URL, {
		// render on request, don't cache data
		cache: 'no-cache',
	});
	const users: User[] = await res.json();

	return (
		<div>
			<h1>Users</h1>
			<p>{new Date().toLocaleTimeString()}</p>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};

export default UsersPage;
