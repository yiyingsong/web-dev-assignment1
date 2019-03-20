import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service.client';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-widget-image',
    templateUrl: './widget-image.component.html',
    styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

    flag = false;
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: Widget;
    widgets: Widget[] = [];
    baseUrl = environment.baseUrl;

    constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute,
                private sharedService: SharedService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
                this.pageId = params['pid'];
                this.widgetId = params['wgid'];
                this.widgets = this.sharedService.widgets;
            }
        );
        this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
            this.widget = data;
            console.log(this.widget);
        });
    }

    updateWidget() {

        if (this.widget['name'] === undefined) {
            this.flag = true;
        } else {
            this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((data: any) => {
                this.widget = data;
            });
            this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data: any) => {
                this.sharedService.widgets = data;
            });
        }
    }

    deleteWidget() {

        this.widgetService.deleteWidget(this.widgetId).subscribe((data: any) => {
        });
        this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data1: any) => {
            this.sharedService.widgets = data1;
        });

    }
}
