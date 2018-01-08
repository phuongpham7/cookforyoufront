import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as $ from 'jquery';

import { Location, Dish, User } from '../../_models/index';
import { LocationService, AlertService, DishService, GlobalService } from '../../_services/index';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(document:click)': 'handleClick($event)',
    },
})
export class SearchComponent implements OnInit {

    public model: any = {};
    public locations = [];
    public loading = false;
    public query = '';
    public filteredList = [];
    public elementRef;
    public userLoggedIn: User = null;

    constructor (public myElement: ElementRef, public locationService: LocationService,
        public alertService: AlertService, public dishService: DishService,
        public globalService: GlobalService) {
        this.elementRef = myElement;
    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.locations.filter(function(el){
                return el != null  &&  el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
    }

    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
            if (!inside) {
                this.filteredList = [];
        }
     }

    ngOnInit() {
        this.userLoggedIn = this.globalService.getUserLoggedIn();
        this.model.user = this.userLoggedIn;
        this.alertService.clear();
    }

    loadLocations() {
        this.locationService.getLocations()
                            .subscribe(
                                data => {
                                    for (const loc of data)
                                    {
                                        this.locations.push(loc.name);
                                    }
                                },
                                err => { console.log(err); });
    }

    previewPhoto(e: Event) {
        const target: HTMLInputElement = e.target as HTMLInputElement;

        if (target.files && target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e: FileReaderEvent) {
                const photo = <HTMLInputElement>document.getElementById('photo');
                photo.src = e.target.result;
            };
            reader.readAsDataURL(target.files[0]);
        }
    }

    getPhotoData(): String {
        const src = (<HTMLInputElement>document.getElementById('photo')).getAttribute('src');
        // tslint:disable-next-line:curly
        if (src.indexOf('data:image') === -1)    return '';
        return src;
    }

    post() {
        this.loading = true;
        this.model.photo = this.getPhotoData();
        this.dishService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.error('hi');
                    $('#newPostModal').hide();
                },
                error => {
                    switch (error.status) {
                        case 500:
                            this.alertService.error('Internal server error.');
                            break;
                        default:
                            this.alertService.error(error);
                            break;
                    }
                });
        this.loading = false;
    }
}

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}