'use client';

import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
	public_id: string;
}

const UploadPage = () => {
	const [publicId, setPublicId] = useState('');

	return (
		<>
			{publicId && (
				<CldImage
					src={publicId}
					width={270}
					height={180}
					alt="milk with coffeeß"
				/>
			)}
			<CldUploadWidget
				uploadPreset="siewh6vu"
				options={{ sources: ['local'], multiple: true, maxFiles: 5 }}
				onSuccess={(result, widget) => {
					if (result.event !== 'success') return;
					const info = result.info as CloudinaryResult;
					setPublicId(info.public_id);
				}}
				onError={(error) => console.log(error)}
			>
				{({ open }) => {
					return (
						<button className="btn btn-primary" onClick={() => open()}>
							Upload
						</button>
					);
				}}
			</CldUploadWidget>
		</>
	);
};

export default UploadPage;
