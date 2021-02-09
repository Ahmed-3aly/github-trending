import { inject, observer } from 'mobx-react';
import React from 'react';
import { IStore } from '../../state';

@inject('ajax')
@observer
export class AjaxState extends
	React.Component<IStore>
{
	render() {
		const p = this.props.ajax;
		if (!p) {
			return null;
		}
		return (
			<div
				className={p.rootName}
			>
				{p.shouldRender && (
					<div className='blur' />
				)}
				{p.shouldRender && (
					<div
						className={p.className}
					>
						<div>
							{p.state}
						</div>
						{p.hasError && (
							<div>
								{p.error}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}
