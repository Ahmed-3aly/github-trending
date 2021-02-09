import { IOwnerModel } from './IOwnerModel';

export interface IRepositoryModel {
	owner: IOwnerModel,
	created: string,
	name: string,
	description: string,
	starsCount: number,
	issuesCount: number,
}
