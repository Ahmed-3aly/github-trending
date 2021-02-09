import moment from 'moment';
import { ajaxMethodEnum, fetchAsync } from '../utils';
import { abstractTrendingApi, IApiResult, IPageRequest } from './abstractTrendingApi';

export class trendingApiAjax extends abstractTrendingApi {
    align(v: number)
    {
        return v < 10 ? ('0' + v) : v.toString();
    }
    async _getPageAsync(
        request: IPageRequest,
    ) {
        let {
            index,
            perPage,
        } = request;
        if (index < 1)
        {
            index = 1;
        }
        let now = Date.now();
        let date = moment(now).subtract(1, "month").toDate();
        let suffix = "q=created:>";
        suffix += date.getFullYear() + '-';
        const m = date.getMonth() + 1;
        suffix += this.align(m) + '-';
        const d = date.getDay();
        suffix += this.align(d); // "2017-10-22";
        suffix += '&sort=stars&order=desc'
        suffix += '&per_page=' + perPage;
        let pager_key = "https://api.github.com/search/repositories?" + suffix;
        let index_key = pager_key + (index > 1 ? '&page=' + index : '');
        let result: IApiResult<any> = {
            ok: false,
        };
        try 
        {
            const a = await fetchAsync(
                ajaxMethodEnum.GET,
                pager_key,
            );
            if (!(
                a.ok &&
                a.payload
            )) {
                throw new Error('Unknown error');
            }
            const headers = a.headers;
            const b = index == 1 ? a : (
                await fetchAsync(
                    ajaxMethodEnum.GET,
                    index_key,
                )
            );
            if (!(
                b.ok &&
                b.payload
            )) {
                throw new Error('Unknown error');
            }
            result.ok = true;
            result.headers = headers;
            result.payload = b.payload;
        }
        catch (x) {
            result.payload = x;
        }
        return result;
    }
}
