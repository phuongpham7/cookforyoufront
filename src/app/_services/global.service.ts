import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from '../_models/index';

@Injectable()
export class GlobalService {

    constructor(private http: Http) { }

    getUserLoggedIn(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}
