import { sleepAsync, config } from '../utils';
import { abstractTrendingApi, IApiResult, IPageRequest } from './abstractTrendingApi';
import Sample from './Sample.json';

export class trendingApiMock extends abstractTrendingApi {
    async _getPageAsync(
        request: IPageRequest,
    ) {
        let result: IApiResult<any> = {
            ok: false,
        };
        try
        {
            await sleepAsync(config.MOCK_DELAY);
            const e = Sample;
            result.ok = true;
            result.payload = Sample;
        }
        catch (x) {
            result.payload = x;
        }
        return result;
    }
}
