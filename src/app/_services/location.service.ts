import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { Location } from '../_models/index';

@Injectable()
export class LocationService {

    private servUrl = 'https://cookforyou.herokuapp.com/api/locations';

    constructor(private http: Http) { }

    getAll(): Observable<Response> {
        return this.http.get(this.servUrl);
    }

    getLocations(): Observable<Location[]> {
        return this.http.get(this.servUrl)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
}
