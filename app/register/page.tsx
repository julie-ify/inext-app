'use client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

function UserRegistration() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		setUserData((prev) => {
			return {
				...prev,
				[target.name]: target.value,
			};
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application.json',
				},
			});

			if (!res.ok) {
			} else if (res.status === 400) {
				throw new Error('Invalid credentials');
			}
			const registeredUser = await res.json();
			setUser(registeredUser);
			router.push('/');
		} catch (error) {
			throw new Error('no token found');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Name</span>
				</div>
				<input
					type="text"
					name="name"
					value={userData.name}
					placeholder="Name"
					className="input input-bordered w-full max-w-xs"
					onChange={handleChange}
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Email</span>
				</div>
				<input
					type="email"
					name="email"
					value={userData.email}
					placeholder="user@example.com"
					className="input input-bordered w-full max-w-xs"
					onChange={handleChange}
				/>
			</label>
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Password</span>
				</div>
				<input
					type="password"
					name="password"
					value={userData.password}
					placeholder="Password"
					className="input input-bordered w-full max-w-xs"
					onChange={handleChange}
				/>
			</label>
			<button type="submit" className="btn btn-primary mt-3">
				Submit
			</button>
		</form>
	);
}

export default UserRegistration;
