import { Injectable } from '@angular/core';
import {User} from '../models';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userChanged: Subject<User> = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    setUserInformation() {
        this.http.get('api/login')
            .subscribe((user: User) => this.userChanged.next(user));
        this.userChanged.next()
    }
}
