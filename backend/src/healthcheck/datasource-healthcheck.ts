import { PrismaClient } from '@prisma/client';

export const getDataSourceHealth = async (prismaClient?: PrismaClient) => {
	try {
		const prismaClientPingResult = await prismaClient?.$runCommandRaw({
			ping: 1,
		});
		return prismaClientPingResult?.ok == 1;
	} catch {
		return false;
	}
};
