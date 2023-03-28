import { PrismaClient, Prisma, ActivityEntity } from '@prisma/client';
import { CacheAPIWrapper } from '../../cache';
import { GetActivities, InputMaybe } from '../schema/generated/types';
import axios from 'axios';

type ActivityEntityId = ActivityEntity['id'];

export type ActivityEntityCollectionPage = {
	totalCount: number;
	items: ActivityEntity[];
};

export class ActivityDataSource {
	constructor(
		private prismaClient: PrismaClient,
		private cacheAPIWrapper?: CacheAPIWrapper<ActivityEntity>
	) {}

	async getActivityById(id: ActivityEntityId): Promise<ActivityEntity | null> {
		let entity = await this.cacheAPIWrapper?.getCached(id);
		if (entity) {
			return entity;
		}
		entity = await this.prismaClient.activityEntity.findFirst({
			where: {
				id,
			},
		});
		if (entity) {
			await this.cacheAPIWrapper?.cache(entity, 'id');
		}
		return entity;
	}

	async getActivities(
		limit: number,
		offset: number,
		query?: InputMaybe<GetActivities> | undefined
	): Promise<ActivityEntityCollectionPage> {
		const whereClause: Prisma.ActivityEntityWhereInput = {};

		if (query?.type) {
			whereClause.type = query.type;
		}

		if (query?.activity) {
			whereClause.activity = query.activity;
		}

		if (query?.participants) {
			whereClause.participants = query.participants;
		}

		if (query?.price) {
			whereClause.price = query.price;
		}

		if (query?.link) {
			whereClause.link = query.link;
		}

		if (query?.key) {
			whereClause.key = query.key;
		}

		if (query?.accessibility) {
			whereClause.accessibility = query.accessibility;
		}

		console.log(whereClause);

		const [totalCount, items] = await this.prismaClient.$transaction([
			this.prismaClient.activityEntity.count(),
			this.prismaClient.activityEntity.findMany({
				where: whereClause,
				take: limit,
				skip: offset,
			}),
		]);
		return {
			totalCount,
			items,
		};
	}

	async createActivity(data: Prisma.ActivityEntityCreateInput): Promise<ActivityEntity> {
		const entity = await this.prismaClient.activityEntity.create({
			data,
		});
		this.cacheAPIWrapper?.cache(entity, 'id');
		return entity;
	}

	async updateActivity(
		id: ActivityEntityId,
		updateActivity: Prisma.ActivityEntityUpdateInput
	): Promise<ActivityEntity> {
		const entity = await this.prismaClient.activityEntity.update({
			where: {
				id,
			},
			data: updateActivity,
		});
		await this.cacheAPIWrapper?.cache(entity, 'id');
		return entity;
	}

	async deleteActivity(id: ActivityEntityId): Promise<ActivityEntity> {
		const deleted = await this.prismaClient.activityEntity.delete({
			where: {
				id,
			},
		});
		if (deleted) {
			await this.cacheAPIWrapper?.invalidateCached(id);
		}
		return deleted;
	}

	async createNewBoredActivities(numActivities: number): Promise<ActivityEntity[]> {
		const url = `https://www.boredapi.com/api/activity`;
		const activities: ActivityEntity[] = [];

		for (let i = 0; i < numActivities; i++) {
			try {
				const response = await axios.get(url);
				const data: Prisma.ActivityEntityCreateInput = response.data;

				const entity = await this.prismaClient.activityEntity.create({
					data,
				});

				this.cacheAPIWrapper?.cache(entity, 'id');

				activities.push(entity);
			} catch (error) {
				console.error(error);
			}
		}
		return activities;
	}
}
