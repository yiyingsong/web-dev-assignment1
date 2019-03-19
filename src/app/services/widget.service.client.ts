import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Widget} from '../models/widget.model.client';

@Injectable()
export  class WidgetService {
    baseUrl = environment.baseUrl;
    constructor(private _http: HttpClient) {}
    createWidget(pageId, widget: Widget) {
        return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget);
    }
    findWidgetsByPageId(pageId) {
        return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget');
    }
    findWidgetById(widgetId) {
        return this._http.get(this.baseUrl + '/api/widget/' + widgetId);
    }
    updateWidget(widgetId, widget) {
        return this._http.put(this.baseUrl + '/api/widget/' + widgetId, widget);
    }
    deleteWidget(widgetId) {
        return this._http.delete(this.baseUrl + '/api/widget/' + widgetId);
    }
    reorderWidgets(startIndex, endIndex, pageId) {
        return this._http.put(this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex, '');
    }
}
