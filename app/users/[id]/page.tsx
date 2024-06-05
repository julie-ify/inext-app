import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
	params: { id: number };
}

// destructure the props to retrive the id
const UserDetailsPage = ({ params: { id } }: Props) => {
	// the notFound() will render the users/id/not-found.tsx component
	if (id > 10) return notFound();
	return <div>UserDetailsPage {id}</div>;
};

export default UserDetailsPage;
