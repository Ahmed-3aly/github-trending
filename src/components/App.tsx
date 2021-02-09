import React from 'react';
import { trendingApi } from '../api';
import { IStore, Store } from '../state';
import { AjaxState } from './controls';
import { Paging } from './Paging';
import { View } from './View';

export class App extends
	React.Component<IStore>
{
	componentDidMount() {
		const api = trendingApi(Store);
		api.getPageAsync();
	}
	render() {
		return (
			<React.Fragment>
				<AjaxState />
				<View />
				<Paging />
			</React.Fragment>
		);
	}
}
