'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NeuUsersPage = () => {
	const router = useRouter()
	return (
		<button className='btn btn-primary' onClick={() => router.push('/')}>Create</button>
	)
}

export default NeuUsersPage