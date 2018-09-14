import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import {StandingsService} from '../services/standings.service';
import {Competition, Standing, UefaStanding} from '../models';
import {CompetitionService} from '../services/competition.service';

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

    teamIcon = faStar;
    standings: Standing[] = [];
    competitions: Competition[];
    uefaStandings: UefaStanding[];

    constructor(private standingsService: StandingsService, private competitionService: CompetitionService) {  }

    ngOnInit() {
        this.standingsService.uefaStandingsChanged.subscribe((uefaStandings: UefaStanding[]) => this.uefaStandings = uefaStandings);
        this.standingsService.standingsChanged.subscribe((standings: Standing[]) => this.standings = standings);
        this.competitionService.competitionsChanged.subscribe((competitions: Competition[]) => this.competitions = competitions);
    }

}
