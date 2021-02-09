
export enum ajaxContentTypeEnum {
	FORM = 'application/x-www-form-urlencoded; charset=utf-8',
	JSON = 'application/json',
	TEXT = 'text/plain',
}

export enum ajaxCorsPolicyEnum {
	CORS = 'cors',
	NO_CORS = 'no-cors',
	SAME = 'same-origin',
}

export enum ajaxMethodEnum {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export enum ajaxRedirectEnum {
	FOLLOW = 'follow',
	ERROR = 'error',
	MANUAL = 'manual',
}
