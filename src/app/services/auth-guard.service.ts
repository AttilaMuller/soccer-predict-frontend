import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        let loggedIn = await this.authService.isAuthenticated();
        if (loggedIn) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }

}
