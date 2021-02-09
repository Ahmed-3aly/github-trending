import moment from 'moment';
import { IOwnerModel, IRepositoryModel } from '../entities';
import { ajaxStateEnum, IViewPage, IStore } from '../state';
import { config, log, sleepAsync } from '../utils';

export interface IPageRequest {
    index: number,
    perPage: number,
}

export interface IApiResult<T> {
    ok: boolean,
    headers?: Headers,
    error?: string,
    payload?: T,
}

export abstract class abstractTrendingApi
{
    private readonly _store: IStore;
    constructor(
        store: IStore,
    ) {
        this._store = store;
    }
    protected abstract _getPageAsync(
        request: IPageRequest,
    ): Promise<IApiResult<any>>;
    async getPageAsync(
        index?: number,
    ) {
        const { ajax, view } = this._store;
        if (!(ajax && view)) {
            return;
        }
        ajax.setState(ajaxStateEnum.Progress);
        if (!index) {
            index = view.index;
        }
        if (index < 1) {
            index = 1;
        }
        let pages = view.count;
        view.setIndex(
            this,
            false,
            1,
            0,
            [],
        );
        const data: IPageRequest = {
            index,
            perPage: view.perPage,
        };
        const e = await this._getPageAsync(
            data,
        );
        if (!(
            e.ok &&
            e.payload
        )) {
            ajax.setError(e.error);
            await sleepAsync(config.ERROR_DELAY);
            ajax.setState(ajaxStateEnum.Init);
            return;
        }
        let print = '';
        if (e.headers) {
            print = e.headers.get('link') as any;
        }
        if (print) {
            const end = print.indexOf('>; rel="last"');
            const key = 'page=';
            let str = print.lastIndexOf(key);
            str += key.length;
            pages = parseInt(print.substr(str, end - str));
        }
        const a = e.payload as any;
        const c: IViewPage = {
            index: data.index,
            count: pages,
            list: a.items.map((x: any) => {
                const owner: IOwnerModel = {
                    name: x.owner.login,
                    avatar: x.owner.avatar_url,
                }
                const repo: IRepositoryModel = {
                    owner,
                    created: moment(x.created_at).fromNow(),
                    description: x.description,
                    name: x.name,
                    issuesCount: x.open_issues_count,
                    starsCount: x.stargazers_count,
                };
                return repo;
            }),
        };
        view.setIndex(
            this,
            false,
            c.index,
            c.count,
            c.list,
        );
        ajax.setState(ajaxStateEnum.Init);
        return;
    }
}
