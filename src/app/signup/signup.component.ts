import { User } from './../_models/user';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {Headers, Response} from '@angular/http';

import { AlertService, UserService } from '../_services/index';
import { Location } from '../_models/index';
import { LocationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
    public model: any = {};
    public loading = false;
    public user: User;

    public locations = [];
    public query = '';
    public filteredList = [];
    public elementRef;

    constructor(
        public router: Router,
        public userService: UserService,
        public alertService: AlertService,
        public myElement: ElementRef,
        public locationService: LocationService) {
            this.elementRef = myElement;
    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.locations.filter(function(el){
                return el != null  && el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
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

    signup() {
        this.loading = true;
        if (!this.validatePasswords()) {
            return;
        }
        this.model.location = this.query;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Signup successful', true);
                    this.router.navigate(['home']);
                },
                error => {
                    switch (error.status) {
                      case 409:
                        this.alertService.error('Email is already used.');
                        break;
                      case 500:
                        this.alertService.error('Server error while creating user.');
                        break;
                      default:
                        this.alertService.error(error);
                        break;
                    }

                    this.loading = false;
                });
    }

    cancel() {
        this.router.navigate(['home']);
    }

    validatePasswords(): boolean {
        this.alertService.clear();
        const password = this.model.password;
        const confirmPassword = this.model.confirmPassword;
        if (password !== confirmPassword) {
            this.alertService.error('Passwords mismatch');
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.loadLocations();
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
}
