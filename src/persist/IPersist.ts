
export interface IPersist<T> {
	clear: () => void,
	get: () => T | undefined,
	set: (
		value: T,
	) => void,
}

export class Persist<T> implements
	IPersist<T>
{
	private _key: string;
	constructor(
		key: string,
	) {
		this._key = key;
	}
	clear() {
		localStorage.removeItem(
			this._key,
		);
	}
	set(
		value: T,
	) {
		localStorage.setItem(
			this._key,
			JSON.stringify(
				value
			),
		);
	}
	get() {
		let e = localStorage.getItem(
			this._key,
		);
		if (!e) {
			return;
		}
		return JSON.parse(e) as T;
	}
}
