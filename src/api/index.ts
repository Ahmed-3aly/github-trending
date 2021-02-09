import { config } from '../utils';
import { trendingApiAjax } from './trendingApiAjax';
import { trendingApiMock } from './trendingApiMock';
import { IStore } from '../state';
export * from './abstractTrendingApi';

export const trendingApi = (
    store: IStore,
) => {
    if (config.MOCK_API) {
        return new trendingApiMock(store);
    }
    return new trendingApiAjax(store);
};
