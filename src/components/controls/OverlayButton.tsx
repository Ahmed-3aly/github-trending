import React from 'react';
import { Button, IButtonProps } from './Button';
import { IOverlayProps, Overlay } from './Overlay';

interface IProps extends
	IButtonProps,
	IOverlayProps
{
	
}

export const OverlayButton = (
	props: IProps,
) => {
	let p = { ...props };
	if (p.disabled === undefined) {
		p.disabled = false;
	}
	if (p.disabled) {
		const suffix = 'disabled';
		if (p.className) {
			p.className += ' ' + suffix;
		}
		else {
			p.className = suffix;
		}
	}
	return (
		<Button {...p} >
			<Overlay {...p} />
		</Button>
	);
};
