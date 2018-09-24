import { Component, OnInit } from '@angular/core'
import { faInfoCircle, faClock, faCalendarAlt, faCheckCircle, faArrowCircleLeft, faArrowCircleRight, faBolt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {MatchService} from '../services/match.service';
import {Competition, Match} from '../models';
import {CompetitionService} from '../services/competition.service';
import {StandingsService} from '../services/standings.service';
import {CommentService} from '../services/comment.service';

@Component({
    selector: 'app-match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

    selectedIcon = faCheckCircle;
    circleLeft = faArrowCircleLeft;
    circleRight = faArrowCircleRight;
    nothingIcon = faTimesCircle;
    winnerIcon = faBolt;
    calendarIcon = faCalendarAlt;
    clockIcon = faClock;
    infoIcon = faInfoCircle;

    matches: Match[] = [];
    competitions: Competition[] = [];
    allCompetitions: Competition[] = [];
    standingsToggled = false;
    today = new Date().toISOString().slice(0, 10);

    dayFilterToggled = true;

    constructor(private matchService: MatchService, private competitionService: CompetitionService, private standingsService: StandingsService) { }
    ngOnInit() {
        this.matchService.matchesChanged.subscribe((matches: Match[]) => this.matches = matches);
        this.matchService.dayFilterChanged.subscribe((toggle: boolean) => this.dayFilterToggled = toggle);
        this.competitionService.competitionsChanged.subscribe((competitions: Competition[]) => this.competitions = competitions);
        this.standingsService.standingsToggled.subscribe((standingToggled: boolean) => this.standingsToggled = standingToggled);
        this.allCompetitions = this.competitionService.getAllCompetitions();
    }

    getCompetitionImage(name: string) {
        return this.allCompetitions.find(competition => competition.name == name).pictureUrl;
    }

    togglePrevMatches() {
        this.matchService.getSpecificMatches(this.competitions, 'previous');
        this.matchService.toggleDayFilter(true);
    }

    toggleNextMatches() {
        this.matchService.getSpecificMatches(this.competitions, 'next');
        this.matchService.toggleDayFilter(false);
    }

    toggleCompetition(id: number) {
        this.competitionService.setCompetitions([id]);
        this.toggleNextMatches();
    }

    toggleStandings() {
        this.standingsService.setStandingsToggled(!this.standingsToggled);
        if(this.standingsToggled){
            this.standingsService.setStanding();
        }
    }
}
