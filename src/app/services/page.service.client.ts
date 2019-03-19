import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Page} from '../models/page.model.client';


@Injectable()
export class PageService {

    baseUrl = environment.baseUrl;
    constructor(private _http: HttpClient) {
    }
    createPage(websiteId: String, page: Page) {
        return this._http.post(this.baseUrl + '/api/website/' + websiteId + '/page', page);
    }
    findPagesByWebsiteId(websiteId) {
        return this._http.get(this.baseUrl + '/api/website/' + websiteId + '/page');
    }
    findPageById(pageId) {
        return this._http.get(this.baseUrl + '/api/page/' + pageId);
    }
    updatePage(pageId, page) {
        return this._http.put(this.baseUrl + '/api/page/' + pageId, page);
    }
    deletePage(pageId) {
        return this._http.delete(this.baseUrl + '/api/page/' + pageId);
    }
}
