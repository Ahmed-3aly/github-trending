import { action, computed, observable } from 'mobx';
import { IStateBase } from './IStateBase';

export enum ajaxStateEnum {
	Init = 'Init',
	Progress = 'progress',
	Success = 'success',
	Error = 'error',
}

export interface IAjaxState extends
	IStateBase
{
	readonly shouldRender: boolean,
	readonly rootName: string,
	readonly className: string,
	readonly isSuccess: boolean,
	readonly isInit: boolean,
	readonly hasError: boolean,
	readonly error: string,
	readonly state: ajaxStateEnum,
	setError: (
		payload?: string | Object,
	) => void,
	setState: (
		state: ajaxStateEnum,
	) => void,
	init: () => void,
}

export class ajaxState
	implements IAjaxState
{
	private readonly prefix = 'ajaxState';
	@computed
	get shouldRender() {
		switch (this.state) {
			case ajaxStateEnum.Init:
			case ajaxStateEnum.Success:
				return false;
			default:
				return true;
		}
	}
	@computed
	get rootName() {
		const prefix = this.prefix + 'Root ';
		const suffix = this.shouldRender
			? this.state
			: 'hidden';
		return prefix + suffix;
	}
	@computed
	get className() {
		const prefix = this.prefix + ' ';
		const suffix = this.shouldRender
			? this.state
			: '';
		return prefix + suffix;
	}
	@computed
	get isInit() {
		return this.state === ajaxStateEnum.Init;
	}
	@computed
	get isSuccess() {
		return this.state === ajaxStateEnum.Success;
	}
	@computed
	get hasError() {
		return this.state === ajaxStateEnum.Error && this.error.length > 0;
	}
	@observable
	error = '';
	@observable
	state: ajaxStateEnum = ajaxStateEnum.Init;
	@action
	setError(
		payload?: string | Object,
	) {
		let error = '';
		const o = payload as any;
		if (
			o !== undefined &&
			o !== null
		) {
			if (o.message) {
				error = o.message;
			}
			else {
				error = o;
			}
		}
		this.state = ajaxStateEnum.Error;
		this.error = error;
	}
	@action
	setState(
		state: ajaxStateEnum,
	) {
		this.state = state;
	}
	@action
	init() {
		this.error = '';
		this.state = ajaxStateEnum.Init;
	}
	reset() {
		this.init();
	}
	constructor() {
		this.init();
	}
}
