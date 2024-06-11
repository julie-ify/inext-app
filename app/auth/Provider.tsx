'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

// Auth provider as a client component so that it can be used in the layout which is a server component
const AuthProvider = ({ children }: { children: ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
