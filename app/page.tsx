import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	// assessing session on the server
	// it's very fast and increases performance
	// getServerSession can also be used to secure our API endpoints
	const session = await getServerSession(authOptions)

	return (
		<main>
			<h1>Hello {session?.user?.name}</h1>
			<Link href="/users">Users</Link>
			<ProductCard />
		</main>
	);
}
