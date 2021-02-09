import { action, computed, observable } from 'mobx';
import { abstractTrendingApi } from '../api';
import { IRepositoryModel } from '../entities';
import { viewPersist as Persist } from '../persist';
import { config, overlayIconEnum } from '../utils';
import { IStateBase } from './IStateBase';

export interface IPersistingState {
	readonly index: number,
	readonly perPage: number,
}

export interface IViewPage {
	readonly index: number,
	readonly count: number,
	readonly list: IRepositoryModel[],
}

export interface IPagingBinding {
	canPrev: boolean,
	canNext: boolean,
	prev: number,
	next: number,
	label: string,
}

export interface IViewState extends
	IStateBase,
	IViewPage,
	IPersistingState
{
	readonly pagingBinding: IPagingBinding,
	readonly isEmpty: boolean,
	readonly viewKeys: string[],
	readonly pagingSizes: number[],
	readonly pagingIcons: overlayIconEnum[],
	init: (
		index?: number,
		perPage?: number,
	) => void,
	setPerPage: (
		api: abstractTrendingApi,
		forceUpdate: boolean,
		perPage: number,
	) => void,
	setIndex: (
		api: abstractTrendingApi,
		forceUpdate: boolean,
		index: number,
		count: number,
		list: IRepositoryModel[],
	) => void,
}

export class viewState
	implements IViewState
{
	readonly viewKeys = [
		'Full Address',
		'Trimmed Address',
	];
	readonly pagingIcons = [
		overlayIconEnum.LeftDouble,
		overlayIconEnum.LeftSingle,
		overlayIconEnum.RightSingle,
		overlayIconEnum.RightDouble,
	];
	readonly pagingSizes = [
		5,
		25,
		50,
		100,
	];
	@computed
	get pagingBinding() {
		const index = this.index;
		const count = this.count;
		const canPrev = index > 1;
		const prev = index - 1;
		const canNext = index < count;
		const next = index + 1;
		let label = '1st page';
		if (count > 1) {
			label = index + ' of ' + count + ' pages';
		}
		const binding: IPagingBinding = {
			canPrev,
			canNext,
			prev,
			next,
			label,
		};
		return binding;
	}
	@computed
	get isEmpty() {
		if (this.list.length < 1) {
			return true;
		}
		return false;
	}
	@observable
	perPage = 0;
	@observable
	index = 1;
	@observable
	count = 0;
	@observable
	list: IRepositoryModel[] = [];
	reset() {
		this.init();
	}
	@action
	init(
		index?: number,
		perPage?: number,
	) {
		if (!(
			index &&
			perPage
		)) {
			const e = Persist.get();
			if (e &&
				e.index &&
				e.perPage
			) {
				index = e.index;
				perPage = e.perPage;
			}
			else {
				index = 1;
				perPage = config.PAGE_SIZE;
			}
		}
		this.index = index;
		this.perPage = perPage;
		this.persist();
	}
	@action
	setPerPage(
		api: abstractTrendingApi,
		forceUpdate: boolean,
		perPage: number,
	) {
		this.perPage = perPage;
		this.persist();
		if (!forceUpdate) {
			return;
		}
		api.getPageAsync();
	}
	@action
	setIndex(
		api: abstractTrendingApi,
		forceUpdate: boolean,
		index: number,
		count: number,
		list: IRepositoryModel[],
	) {
		this.index = index;
		this.count = count;
		this.list = list;
		this.persist();
		if (!forceUpdate) {
			return;
		}
		api.getPageAsync();
	}
	private persist() {
		Persist.set({
			index: this.index,
			perPage: this.perPage,
		});
	}
	constructor() {
		this.init();
	}
}
