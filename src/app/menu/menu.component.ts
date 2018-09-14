import { Component, OnInit } from '@angular/core';
import {CompetitionService} from '../services/competition.service';
import {Competition} from '../models';
import {MatchService} from '../services/match.service';
import {StandingsService} from '../services/standings.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    competitions: Competition[];
    competitionsMenu: Competition[];

    constructor(private competitionService: CompetitionService, private matchService: MatchService, private standingsService: StandingsService) { }

    ngOnInit() {
        this.competitionService.competitionsChanged.subscribe((competitions: Competition[]) => this.competitions = competitions);
        this.competitionsMenu = this.competitions;
    }

    toggleCompetition(id: number) {
        this.matchService.toggleDayFilter(false);
        this.standingsService.setStandingsToggled(false);
        this.competitionService.setCompetitions([id]);
        this.matchService.getSpecificMatches(this.competitions, 'next');
    }
}
