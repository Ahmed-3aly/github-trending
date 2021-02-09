import React from 'react';

export interface IButtonProps {
	onClick: () => void,
	toolTip: string,
	disabled?: boolean,
	className?: string,
	children?: any,
}

export const Button = (
	props: IButtonProps,
) => {
	let p = { ...props };
	if (p.disabled === undefined) {
		p.disabled = false;
	}
	if (p.disabled && p.className) {
		p.className += ' disabled';
	}
	let tip = '';
	if (p.toolTip) {
		tip = p.toolTip.toUpperCase();
	}
	return (
		<button
			title={tip}
			disabled={p.disabled}
			className={p.className}
			onClick={(e) => {
				e.stopPropagation();
				p.onClick();
			}}
		>
			{p.children}
		</button>
	);
};
