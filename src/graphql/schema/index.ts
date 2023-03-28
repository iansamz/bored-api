import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

import { activityResolvers, activityTypeDefs } from './activity';

const typeDefs = mergeTypeDefs([activityTypeDefs]);

const resolvers = mergeResolvers([activityResolvers]);

export const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
