import { inject, observer } from 'mobx-react';
import React from 'react';
import { IStore } from '../state';
import { PagingIndex, PagingSize } from './controls';

@inject('view')
@observer
export class Paging extends
	React.Component<IStore>
{
	render() {
		const p = this.props.view;
		if (!p) {
			return null;
		}
		let renderControls = false;
		if ((
			p &&
			p.count > 1 &&
			p.pagingBinding
		)) {
			renderControls = true;
		}
		return renderControls && (
			<div
				className='paging'
			>
				{PagingIndex(p)}
				{PagingSize(p)}
			</div>
		);
	}
}
