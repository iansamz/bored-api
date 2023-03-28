import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

/** Activity object */
export type Activity = {
	__typename?: 'Activity';
	/** The accesibility of the Activity */
	accessibility: Scalars['Float'];
	/** The name of the Activity */
	activity: Scalars['String'];
	/** The ID of the Activity */
	id: Scalars['String'];
	/** The key of the Activity */
	key: Scalars['String'];
	/** The link of the Activity */
	link: Scalars['String'];
	/** The participants of the Activity */
	participants: Scalars['Int'];
	/** The price of the Activity */
	price: Scalars['Float'];
	/** The type of the Activity */
	type: Scalars['String'];
};

/** A page of activity items */
export type ActivityCollectionPage = {
	__typename?: 'ActivityCollectionPage';
	/** A list of records of the requested page */
	items: Array<Maybe<Activity>>;
	/** Identifies the total count of activity records in data source */
	totalCount: Scalars['Int'];
};

export type CreateActivity = {
	/** The accesibility of the Activity */
	accessibility: Scalars['Float'];
	/** The name of the Activity */
	activity: Scalars['String'];
	/** The key of the Activity */
	key: Scalars['String'];
	/** The link of the Activity */
	link: Scalars['String'];
	/** The participants of the Activity */
	participants: Scalars['Int'];
	/** The price of the Activity */
	price: Scalars['Float'];
	/** The type of the Activity */
	type: Scalars['String'];
};

/** Activity mutations */
export type Mutation = {
	__typename?: 'Mutation';
	/** Creates a new Activity */
	createActivity: Activity;
	/** Removes a Activity */
	deleteActivity?: Maybe<Scalars['Boolean']>;
	/** Updates a Activity */
	updateActivity: Activity;
};

/** Activity mutations */
export type MutationcreateActivityArgs = {
	input: CreateActivity;
};

/** Activity mutations */
export type MutationdeleteActivityArgs = {
	id: Scalars['String'];
};

/** Activity mutations */
export type MutationupdateActivityArgs = {
	id: Scalars['String'];
	input: UpdateActivity;
};

/** Activity queries */
export type Query = {
	__typename?: 'Query';
	/** Returns a list of Technologies */
	activities: ActivityCollectionPage;
	/** Returns a single Activity by ID */
	activity?: Maybe<Activity>;
};

/** Activity queries */
export type QueryactivitiesArgs = {
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
};

/** Activity queries */
export type QueryactivityArgs = {
	id: Scalars['String'];
};

export type UpdateActivity = {
	/** The accesibility of the Activity */
	accessibility: Scalars['Float'];
	/** The name of the Activity */
	activity: Scalars['String'];
	/** The key of the Activity */
	key: Scalars['String'];
	/** The link of the Activity */
	link: Scalars['String'];
	/** The participants of the Activity */
	participants: Scalars['Int'];
	/** The price of the Activity */
	price: Scalars['Float'];
	/** The type of the Activity */
	type: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Activity: ResolverTypeWrapper<Activity>;
	ActivityCollectionPage: ResolverTypeWrapper<ActivityCollectionPage>;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	CreateActivity: CreateActivity;
	Float: ResolverTypeWrapper<Scalars['Float']>;
	Int: ResolverTypeWrapper<Scalars['Int']>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	UpdateActivity: UpdateActivity;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Activity: Activity;
	ActivityCollectionPage: ActivityCollectionPage;
	Boolean: Scalars['Boolean'];
	CreateActivity: CreateActivity;
	Float: Scalars['Float'];
	Int: Scalars['Int'];
	Mutation: {};
	Query: {};
	String: Scalars['String'];
	UpdateActivity: UpdateActivity;
};

export type ActivityResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']
> = {
	accessibility?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
	activity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	participants?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
	type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityCollectionPageResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['ActivityCollectionPage'] = ResolversParentTypes['ActivityCollectionPage']
> = {
	items?: Resolver<Array<Maybe<ResolversTypes['Activity']>>, ParentType, ContextType>;
	totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	createActivity?: Resolver<
		ResolversTypes['Activity'],
		ParentType,
		ContextType,
		RequireFields<MutationcreateActivityArgs, 'input'>
	>;
	deleteActivity?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<MutationdeleteActivityArgs, 'id'>
	>;
	updateActivity?: Resolver<
		ResolversTypes['Activity'],
		ParentType,
		ContextType,
		RequireFields<MutationupdateActivityArgs, 'id' | 'input'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	activities?: Resolver<
		ResolversTypes['ActivityCollectionPage'],
		ParentType,
		ContextType,
		RequireFields<QueryactivitiesArgs, 'limit' | 'offset'>
	>;
	activity?: Resolver<
		Maybe<ResolversTypes['Activity']>,
		ParentType,
		ContextType,
		RequireFields<QueryactivityArgs, 'id'>
	>;
};

export type Resolvers<ContextType = any> = {
	Activity?: ActivityResolvers<ContextType>;
	ActivityCollectionPage?: ActivityCollectionPageResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
};
