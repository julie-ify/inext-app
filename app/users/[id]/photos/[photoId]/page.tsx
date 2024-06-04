import React from 'react';

interface Props {
	// route params id and photoId
	params: { id: number; photoId: number };
}

// destructure the props to retrive the id
const PhotoPage = ({ params: { id, photoId } }: Props) => {
	return <div>PhotoPage {id} {photoId}</div>;
};

export default PhotoPage;
