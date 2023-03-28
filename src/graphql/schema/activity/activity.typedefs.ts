import gql from 'graphql-tag';

export const activityTypeDefs = gql`
	"""
	Activity object
	"""
	type Activity {
		"The ID of the Activity"
		id: String!
		"The name of the Activity"
		activity: String!
		"The type of the Activity"
		type: String!
		"The participants of the Activity"
		participants: String!
		"The price of the Activity"
		price: String!
		"The link of the Activity"
		link: String
		"The key of the Activity"
		key: String!
		"The accesibility of the Activity"
		accessibility: String!
	}

	"""
	A page of activity items
	"""
	type ActivityCollectionPage {
		"Identifies the total count of activity records in data source"
		totalCount: Int!
		"A list of records of the requested page"
		items: [Activity]!
	}

	"""
	Activity queries
	"""
	type Query {
		"Returns a single Activity by ID"
		activity(id: String!): Activity
		"Returns a list of Technologies"
		activities(limit: Int = 5, offset: Int = 0): ActivityCollectionPage!
	}

	input CreateActivity {
		"The name of the Activity"
		activity: String!
		"The type of the Activity"
		type: String!
		"The participants of the Activity"
		participants: String!
		"The price of the Activity"
		price: String!
		"The link of the Activity"
		link: String
		"The key of the Activity"
		key: String!
		"The accesibility of the Activity"
		accessibility: String!
	}

	input UpdateActivity {
		"The name of the Activity"
		activity: String!
		"The type of the Activity"
		type: String!
		"The participants of the Activity"
		participants: String!
		"The price of the Activity"
		price: String!
		"The link of the Activity"
		link: String
		"The key of the Activity"
		key: String!
		"The accesibility of the Activity"
		accessibility: String!
	}

	"""
	Activity mutations
	"""
	type Mutation {
		"Creates a new Activity"
		createActivity(input: CreateActivity!): Activity!
		"Updates a Activity"
		updateActivity(id: String!, input: UpdateActivity!): Activity!
		"Removes a Activity"
		deleteActivity(id: String!): Boolean
	}
`;
