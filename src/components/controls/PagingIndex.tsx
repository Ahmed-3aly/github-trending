import React from 'react';
import { trendingApi } from '../../api';
import { Store, IViewState } from '../../state';
import { OverlayButton } from './OverlayButton';

const api = trendingApi(Store);

export function PagingIndex(
	p: IViewState,
) {
	const b = p.pagingBinding;
	return (
		<div
			className='pagingIndex'
		>
			<OverlayButton
				toolTip='first'
				disabled={!b.canPrev}
				icon={p.pagingIcons[0]}
				onClick={() => api.getPageAsync(1)}
			/>
			<OverlayButton
				toolTip='previous'
				disabled={!b.canPrev}
				icon={p.pagingIcons[1]}
				onClick={() => api.getPageAsync(b.prev)}
			/>
			<span>
				{b.label}
			</span>
			<OverlayButton
				toolTip='next'
				disabled={!b.canNext}
				icon={p.pagingIcons[2]}
				onClick={() => api.getPageAsync(b.next)}
			/>
			<OverlayButton
				toolTip='last'
				disabled={!b.canNext}
				icon={p.pagingIcons[3]}
				onClick={() => api.getPageAsync(p.count)}
			/>
		</div>
	);
}
