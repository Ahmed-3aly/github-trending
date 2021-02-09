import { configure, observable } from 'mobx';
import { ajaxState, IAjaxState } from './ajaxState';
import { IStateBase } from './IStateBase';
import { IViewState, viewState } from './viewState';

configure({
	enforceActions: 'observed',
	computedRequiresReaction: true,
});

export interface IStore {
	ajax?: IAjaxState,
	view?: IViewState,
}

export interface IStoreBind extends
	IStateBase
{
	ajax: IAjaxState,
	view: IViewState,
}

class StoreBind implements
	IStore,
	IStoreBind
{
	@observable
	ajax!: IAjaxState;
	@observable
	view!: IViewState;
	constructor() {
		this.ajax = new ajaxState();
		this.view = new viewState();
		this.reset();
	}
	reset() {
		this.ajax.reset();
		this.view.reset();
	};
}

export const Store = new StoreBind();
