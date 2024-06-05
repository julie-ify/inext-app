'use client';
import React from 'react';

interface Props {
	error: Error;
	reset: () => void;
}

// this is a client component because we added a click event
// the reset button is for the user to retry
// this error component receives the error object as props, done by nextjs
const ErrorPage = ({ error, reset }: Props) => {
	return (
		<>
			<div>An unexpected error has occurred</div>
			<span>{error.message}</span>
			<button className="btn" onClick={() => reset()}>
				Retry
			</button>
		</>
	);
};

export default ErrorPage;
