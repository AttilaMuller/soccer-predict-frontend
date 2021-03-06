import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';

(window as any).global = window;

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: 'avzjeFx0ZZ9aOoXIbPFcPNMymrrWdrlg',
        domain: 'beyond-pluto.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://beyond-pluto.eu.auth0.com/api/v2/',
        redirectUri: 'http://localhost:4200/',
        scope: 'openid profile'
    });

    constructor(private http: HttpClient, private userService: UserService) {}

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
            } else if (err) {
                console.log(err);
            }
            this.userService.setUserInformation();
        });
    }

    private setSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
    }

}
