import React from 'react';

interface Props {
	params: { id: number };
}

// destructure the props to retrive the id
const UserDetailsPage = ({ params: { id } }: Props) => {
	return <div>UserDetailsPage {id}</div>;
};

export default UserDetailsPage;
