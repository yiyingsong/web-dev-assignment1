import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

    flag = false;
    error: string;
    alert: string;
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;
    widgets: any;

    constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        // initialize error and alert text
        this.error = 'Enter the name of the widget';
        this.alert = '* Enter the widget name';

        this.activatedRoute.params
            .subscribe(
                (params: any) => {
                    this.userId = params['uid'];
                    this.websiteId = params['wid'];
                    this.pageId = params['pid'];
                    this.widgetId = params['wgid'];
                }
            );
        this.widgetService.findWidgetById(this.widgetId).subscribe(
            (widget: any) => {
                this.widget = widget;
            }
        );
    }

    updateWidget() {

        if (this.widget['name'] === undefined) {
            this.flag = true;
        } else {
            this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
                (widget: any) => {
                    console.log('update widget header: ');
                });
        }
    }

    deleteWidget() {
        this.widgetService.deleteWidget(this.widgetId).subscribe((data: any) => {
            console.log('widget deleted' + data._id);
        });
    }

}
