import { Component, OnInit } from '@angular/core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {MatchService} from '../services/match.service';
import {CompetitionService} from '../services/competition.service';
import {StandingsService} from '../services/standings.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    logo = 'assets/logo2.png';
    loginIcon = faSignInAlt;

    constructor(private matchService: MatchService, private competitionService: CompetitionService, private standingService: StandingsService ) { }

    ngOnInit() {
    }

    toggleCompetitions() {
        this.matchService.toggleDayFilter(false);
        this.standingService.setStandingsToggled(false);
        this.matchService.setAllMatches();
        this.competitionService.setAllCompetitions();
    }
}
