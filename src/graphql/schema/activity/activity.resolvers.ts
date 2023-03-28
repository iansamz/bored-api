import { ServerContext } from '../../server-context/server-context';
import { Resolvers, UpdateActivity } from '../generated/types';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { mapActivity, mapActivityCollectionPage } from '../../mappers';

type ExcludeNullProp<T extends Record<string, unknown>, TKey extends keyof T> = {
	[Key in keyof T]: Key extends TKey ? Exclude<T[Key], null> : T[Key];
};

export const activityResolvers: Resolvers<ServerContext> = {
	Query: {
		activity: async (_parent, { id }, { dataSources: { activityDataSource } }) => {
			const entity = await activityDataSource.getActivityById(id);
			if (!entity) {
				throw new GraphQLError('Activity not found.', {
					extensions: {
						code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
					},
				});
			}
			return mapActivity(entity);
		},
		activities: async (_parent, { limit, offset }, { dataSources: { activityDataSource } }) => {
			const collectionPage = await activityDataSource.getActivities(limit, offset);
			return mapActivityCollectionPage(collectionPage);
		},
	},
	Mutation: {
		createActivity: async (_parent, { input }, { dataSources }) => {
			const entity = await dataSources.activityDataSource.createActivity(input);
			return mapActivity(entity);
		},
		updateActivity: async (_parent, { id, input }, { dataSources }) => {
			const entity = await dataSources.activityDataSource.updateActivity(id, input);
			return mapActivity(entity);
		},
		deleteActivity: async (_parent, { id }, { dataSources }) => {
			const entity = await dataSources.activityDataSource.deleteActivity(id);
			return Boolean(entity);
		},
	},
};
