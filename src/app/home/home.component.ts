import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    model: any = {};

    constructor() { }

    ngOnInit() {
    }
}
