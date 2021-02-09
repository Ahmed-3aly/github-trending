
export function log(
	name: string,
	e?: any,
) {
	const cmd: any | undefined = console.group;
	// const cmd: any | undefined = console.groupCollapsed;
	cmd(
		' %c' + name,
		'color: gold',
	);
	if (e) {
		console.log(e);
	}
	console.groupEnd();
}
