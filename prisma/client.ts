import { PrismaClient } from '@prisma/client';

// Using the globalThis module helps prevent the error of instantiating several prisma clinet
// This ensures that only one instance is availabe even when we restart our app
const prismaClientSingleton = () => {
	return new PrismaClient();
};

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: prismaClientSingleton | undefined;
};

const client = globalForPrisma.prisma ?? prismaClientSingleton();

export default client;
