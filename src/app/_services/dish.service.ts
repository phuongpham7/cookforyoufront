import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { Dish } from '../_models/index';

@Injectable()
export class DishService {

    private servUrl = 'https://cookforyou.herokuapp.com/api/dishes';

    constructor(private http: Http) { }

    getAll(): Observable<Dish[]> {
        return this.http.get(this.servUrl)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id: string): Observable<Response> {
        return this.http.get(this.servUrl + '/' + id)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(dish: Dish): Observable<Response> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.post(this.servUrl, JSON.stringify(dish), options);
    }

    update(dish: Dish): Observable<Response> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.put(this.servUrl + '/' + dish.id, JSON.stringify(dish), options);
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(this.servUrl + '/' + id);
    }

    // private helper methods

    private extractData(res: Response) {
        const body = res.json();
            return body;
        }
}
