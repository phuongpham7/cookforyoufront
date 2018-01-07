import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    private servUrl = 'https://cookforyou.herokuapp.com/api/users';

    constructor(private http: Http) { }

    getAll(): Observable<Response> {
        return this.http.get(this.servUrl)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;
    }

    getById(id: string): Observable<Response> {
        return this.http.get(this.servUrl + '/' + id)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(user: User): Observable<Response> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.post(this.servUrl, JSON.stringify(user), options);
    }

    update(user: User): Observable<Response> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.put(this.servUrl + '/' + user.id, JSON.stringify(user), options);
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(this.servUrl + '/' + id);
    }

    // private helper methods

    private extractData(res: Response) {
        const body = res.json();
            return body;
        }

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
