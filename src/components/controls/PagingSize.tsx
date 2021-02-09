import React from 'react';
import { IViewState, Store } from '../../state';
import { Button } from '../controls';
import { trendingApi } from '../../api';

const api = trendingApi(Store);

function print(v: number) {
	let x = v.toString();
	if (x.length < 2) {
		x += '0' + x;
	}
	return x;
}

function toolTip(v: number)
{
	return print(v) + ' items per page';
}

export const PagingSize = (
	p: IViewState,
) => (
	<div
		className='pagingSize'
	>
		<span>
			Size
		</span>
		{p.pagingSizes.map((x, i) => {
			return (
				<Button
					key={i}
					toolTip={toolTip(x)}
					disabled={x === p.perPage}
					onClick={() => p.setPerPage(api, true, x)}
				>
					{x}
				</Button>
			);
		})}
	</div>
);
