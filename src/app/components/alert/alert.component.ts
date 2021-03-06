import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../_services/index';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {
    public message: any;

    constructor(public alertService: AlertService) {}

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
