import { BaseContext } from '@apollo/server';
import { ActivityDataSource } from '../data-sources';

export type ServerContextDataSources = {
	activityDataSource: ActivityDataSource;
};

export type ServerContext = BaseContext & {
	// custom context properties
	dataSources: ServerContextDataSources;
} & Partial<{ token?: string }>;
