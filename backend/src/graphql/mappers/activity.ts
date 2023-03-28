import { ActivityEntity } from '@prisma/client';
import { ActivityEntityCollectionPage } from '../data-sources';
import { Activity, ActivityCollectionPage } from '../schema/generated/types';

export const mapActivity = (entity: ActivityEntity): Activity => ({
	__typename: 'Activity',
	id: entity.id,
	activity: entity.activity,
	type: entity.type,
	participants: entity.participants,
	price: entity.price,
	link: entity.link,
	key: entity.key,
	accessibility: entity.accessibility,
});

export const mapActivityCollectionPage = (
	entityCollectionPage: ActivityEntityCollectionPage
): ActivityCollectionPage => {
	return {
		totalCount: entityCollectionPage.totalCount,
		items: entityCollectionPage.items.map(mapActivity),
	};
};
