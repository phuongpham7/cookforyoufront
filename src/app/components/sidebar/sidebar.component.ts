import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'home', class: '' },
    { path: 'icons', title: 'Icons',  icon:  'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon: 'location_on', class: '' },
];

export const LOGGEDINROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'home', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: 'icons', title: 'Icons',  icon:  'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: 'notifications', title: 'Notifications',  icon: 'notifications', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    userLoggedIn: string;

    constructor() { }

    ngOnInit() {
        this.userLoggedIn = localStorage.getItem('currentUser');

        if (this.userLoggedIn == null || this.userLoggedIn === '') {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
        // tslint:disable-next-line:one-line
        else {
            this.menuItems = LOGGEDINROUTES.filter(menuItem => menuItem);
        }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
