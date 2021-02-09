import React from 'react';
import { overlayIconEnum, overlaySizeEnum } from '../../utils';

export interface IOverlayProps {
	icon: overlayIconEnum,
	size?: overlaySizeEnum,
}

export const Overlay = (
	props: IOverlayProps,
) => {
	let p = { ...props };
	let c = 'Overlay fa-fw ';
	if (!p.size) {
		p.size = overlaySizeEnum.Size_0;
	}
	c +=
		p.size +
		' ' +
		p.icon;
	return (
		<i className={c} />
	);
};
