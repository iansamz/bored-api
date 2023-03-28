import { ServerContext } from './server-context';
import { ExpressMiddlewareOptions } from '@apollo/server/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { ActivityDataSource } from '../data-sources';
import { ActivityEntity, PrismaClient } from '@prisma/client';
import { createCacheAPIWrapperAsync } from '../../cache';

export const createServerContextMiddlewareOptionsAsync = async (): Promise<
	WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>
> => {
	const prismaClient = new PrismaClient();
	const activityCacheAPIWrapper = await createCacheAPIWrapperAsync<ActivityEntity>('activity');
	const activityDataSource = activityCacheAPIWrapper
		? new ActivityDataSource(prismaClient, activityCacheAPIWrapper)
		: new ActivityDataSource(prismaClient);

	return {
		context: async ({ req }) => ({
			dataSources: {
				activityDataSource,
			},
			token: req.headers.authorization,
		}),
	};
};
