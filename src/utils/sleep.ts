
export function sleep(
	milliSeconds: number
): void {
	sleepAsync(milliSeconds).then(() => {
		return;
	});
}

export function sleepAsync(
	milliSeconds: number
) {
	return new Promise(
		resolve => setTimeout(resolve, milliSeconds)
	);
}
