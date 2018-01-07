import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/index';
import { Location } from '@angular/common';

@Injectable()
export class AuthenticationService {

    private servUrl = 'http://localhost:8080/api/authenticateUser';
    private loggedInUser: User;

    constructor(private http: Http) { }

    login(email: string, password: string) {
        return this.http.post(this.servUrl, JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUser',
                        JSON.stringify({ id: user.id, email: user.email, password: user.password, name: user.name,
                            location: user.location.name }));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
