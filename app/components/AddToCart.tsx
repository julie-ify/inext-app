'use client';
import React from 'react';

// This component renders button that requires browser event listener so we create it as a client component
// and render it as a child of a server component
const AddToCart = () => {
	return (
		<div>
			<button className='btn btn-secondary' onClick={() => console.log('hello')}>Add To Cart</button>
		</div>
	);
};

export default AddToCart;
