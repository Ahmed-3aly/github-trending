import { ajaxContentTypeEnum, ajaxCorsPolicyEnum, ajaxMethodEnum, ajaxRedirectEnum } from './ajaxEnums';
import { IAjaxRequest } from './IAjaxRequest';
import { IAjaxResult } from './IAjaxResult';

function ajaxRequest(
	method: ajaxMethodEnum,
	data?: any,
	contentType?: ajaxContentTypeEnum,
	token?: string,
	corsMode?: ajaxCorsPolicyEnum,
	redirect?: ajaxRedirectEnum,
) {
	let headers: any = {};
	if (token) {
		headers['X-XSRF-TOKEN'] = token;
	}
	if (contentType) {
		headers['Content-Type'] = contentType;
	}
	let request: IAjaxRequest = {
		method,
		headers,
	};
	if (token) {
		request = {
			...request,
			credentials: 'include',
		};
	}
	if (corsMode) {
		request.mode = corsMode;
	}
	if (redirect) {
		request.redirect = redirect;
	}
	if (method !== ajaxMethodEnum.GET) {
		if (data) {
			if (contentType === ajaxContentTypeEnum.JSON) {
				data = JSON.stringify(data);
			}
			request.body = data;
		}
	}
	return request;
}

function ajaxResult(
	method: ajaxMethodEnum,
	path: string,
	request: IAjaxRequest | undefined,
	ok: boolean,
	headers: Headers | undefined,
	payload: object | undefined,
) {
	const result: IAjaxResult = {
		ok,
		headers,
		payload
	}
	console.log(
		'%cAJAX '
		+ method + ' -> %c'
		+ path,
		'color: gold',
		'color: red',
	);
	console.log('REQUEST');
	console.log(request);
	console.groupEnd();
	console.log(ok ? 'OK' : 'ERROR');
	if (payload) {
		console.log(payload);
	}
	console.groupEnd();
	console.groupEnd();
	return result;
}

export async function fetchAsync(
	method: ajaxMethodEnum,
	path: string,
	data?: any,
	contentType?: ajaxContentTypeEnum,
	token?: string,
) {
	if (method === ajaxMethodEnum.GET) {
		if (data) {
			let keys = Object.keys(data);
			let vals = Object.values(data);
			let prefix = '?';
			keys.forEach((key, index) => {
				let val = vals[index];
				if (key && val) {
					path += prefix + key + '=' + val;
					prefix = '&';
				}
			});
			data = undefined;
		}
	}
	const request: IAjaxRequest = ajaxRequest(
		method,
		data,
		contentType,
		token,
		undefined,
		ajaxRedirectEnum.ERROR,
	)
	try {
		const send = { ...request } as any;
		let response = await fetch(
			path,
			send,
		)
		if (!response.ok) {
			let error = response.status.toString();
			if (response.statusText) {
				error += ': ' + response.statusText;
			}
			throw new Error(error);
		}
		let text = await response.text();
		let result: any | undefined = undefined;
		if (text) {
			try {
				result = JSON.parse(text);
			}
			catch (ignore) { }
		}
		return ajaxResult(
			method,
			path,
			request,
			true,
			response.headers,
			result,
		)
	}
	catch (x) {
		return ajaxResult(
			method,
			path,
			request,
			false,
			undefined,
			{
				Type: 'Exception',
				message: x.message,
			},
		)
	}
}
