import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Competition, Match} from '../models';
import {MatchService} from '../services/match.service';
import {CompetitionService} from '../services/competition.service';
import {faBolt, faCalendarAlt, faClock, faComments, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

    winnerIcon = faBolt;
    calendarIcon = faCalendarAlt;
    clockIcon = faClock;
    infoIcon = faInfoCircle;
    commentsIcon = faComments;

    basicMatchInfo: Match = null;
    allCompetitions: Competition[] = [];

    constructor(private route: ActivatedRoute, private matchService: MatchService, private competitionService: CompetitionService) {}

    ngOnInit() {
        this.matchService.matchChanged.subscribe((match: Match) => this.basicMatchInfo = match);
        this.route.params.subscribe((params: Params) => {
            this.matchService.getMatch(params['id'], params['date']);
        });
        this.allCompetitions = this.competitionService.getAllCompetitions();
    }

    getCompetitionImage(name: string) {
        return this.allCompetitions.find(competition => competition.name == name).pictureUrl;
    }

}
