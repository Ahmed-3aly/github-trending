import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { IRepositoryModel } from '../entities';
import { IStore } from '../state';
import { overlayIconEnum, overlaySizeEnum } from '../utils';
import { Overlay } from './controls';

const size = overlaySizeEnum.Size_1;

@inject('view')
@observer
export class View extends
	React.Component<IStore>
{
	render() {
		const p = this.props.view;
		if (!p) {
			return null;
		}
		const json = toJS(
			p.list
		);
		return (
			<div
				className='view'
			>
				<div
					className='list'
				>
					{this.renderJson(json)}
				</div>
			</div>
		);
	}
	renderJson = (
		v: IRepositoryModel[]
	) => v.map((x, i) => (
		<div
			key={i}
		>
			<img
				src={x.owner.avatar}
				alt='red'
				width='90'
				height='90'
			/>
			<div
				className='viewName'
			>
				{x.name}
			</div>
			<div
				className='viewDesc'
			>
				{x.description}
			</div>
			<div
				className='stats'
			>
				<div
					className='statsLabel'
				>
					<Overlay
						icon={overlayIconEnum.StarEmpty}
						size={size}
					/>
					<span>Stars:</span>
					<span>{x.starsCount}</span>
				</div>
				<div
					className='statsLabel'
				>
					<Overlay
						icon={overlayIconEnum.InfoCircle}
						size={size}
					/>
					<span>Issues:</span>
					<span>{x.issuesCount}</span>
				</div>
				<div
					className='statsDesc'
				>
					Submitted {x.created} by
				</div>
				<div
					className='statsName'
				>
					{x.owner.name}
				</div>
			</div>
		</div>
	));
}
