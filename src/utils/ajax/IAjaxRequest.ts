import { ajaxCorsPolicyEnum, ajaxRedirectEnum } from './ajaxEnums';

export interface IAjaxRequest
{
	method: string,
	credentials?: string,
	mode?: ajaxCorsPolicyEnum,
	redirect?: ajaxRedirectEnum,
	headers?: any,
	body?: string,
}
