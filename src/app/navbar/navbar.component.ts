import { Component, OnInit } from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {MatchService} from '../services/match.service';
import {CompetitionService} from '../services/competition.service';
import {StandingsService} from '../services/standings.service';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    logo = 'assets/logo2.png';
    loginIcon = faSignInAlt;
    user: User;

    constructor(private matchService: MatchService, private competitionService: CompetitionService,
                private standingService: StandingsService, private authService: AuthService,
                private userService: UserService) { }

    ngOnInit() {
        this.userService.userChanged.subscribe((user: User) => this.user = user)
    }

    toggleCompetitions() {
        this.matchService.toggleDayFilter(false);
        this.standingService.setStandingsToggled(false);
        this.matchService.setAllMatches();
        this.competitionService.setAllCompetitions();
    }

    login() {
        this.authService.login();
    }
    logout() {
        this.authService.logout();
    }

    isLogeddIn() {
        return this.authService.isAuthenticated();
    }
}
