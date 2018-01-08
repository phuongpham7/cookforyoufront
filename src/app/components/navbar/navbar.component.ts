import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';

import * as $ from 'jquery';

import { AlertService, AuthenticationService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public listTitles: any[];
    public location: Location;
    public toggleButton: any;
    public sidebarVisible: boolean;
    public userLoggedIn: User;
    public loading = false;
    public model: any = {};

    constructor(location: Location, public element: ElementRef,
            public alertService: AlertService, public authenticationService: AuthenticationService,
            public router: Router) {
        this.location = location;
        this.sidebarVisible = false;
        this.element = element;
    }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
        this.alertService.clear();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice( 2 );
        }
        titlee = titlee.split('/').pop();

        for (let item = 0; item < this.listTitles.length; item++){
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Home';
    };

    logout() {
        localStorage.removeItem('currentUser');
    };

    signin() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    // location.reload();
                },
                error => {
                    switch (error.status) {
                      case 404:
                        this.alertService.error('Email does not exist.');
                        break;
                      case 403:
                        this.alertService.error('Password is not correct.');
                        break;
                      default:
                        this.alertService.error(error);
                        break;
                    }
                });
        this.loading = false;
    }
}
