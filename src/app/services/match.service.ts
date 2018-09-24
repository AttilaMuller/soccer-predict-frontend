import { Injectable } from '@angular/core';
import {Competition, Match } from '../models';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CompetitionService} from './competition.service';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    matchesChanged: Subject<Array<Match>> = new BehaviorSubject<Array<Match>>([]);
    allMatchesChanged: Subject<Array<Match>> = new BehaviorSubject<Array<Match>>([]);
    matchChanged: Subject<Match> = new BehaviorSubject<Match>(null);
    dayFilterChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private previousMatches: Match[] = [];
    private nextMatches: Match[] = [];
    private allMatches: Match[] = [];
    private competitions: Competition[] = [];

    constructor(private http: HttpClient, private competitionService: CompetitionService) {
        this.competitionService.competitionsChanged.subscribe((competitions: Competition[]) => this.competitions = competitions);
        this.getMatches(this.competitions);
    }

    getMatches = (competitions: Competition[]) => {
        this.http.post('api/matches/last', this.mapCompetitions(competitions))
            .subscribe((matches: Match[]) => {
                this.previousMatches = matches;
                this.allMatches = matches;
            });
        this.http.post('api/matches/next', this.mapCompetitions(competitions))
            .subscribe((matches: Match[]) => {
                this.nextMatches = matches;
                this.allMatches = [...this.allMatches, ...matches];
                this.allMatchesChanged.next(this.allMatches);
                this.matchesChanged.next(this.nextMatches);
            });
    };

    getMatch(id: number, date: string) {
        this.matchChanged.next(null);
        let today = new Date().toISOString().slice(0, 10);
        if (date.slice(0, 10) >= today) {
            this.http.post('api/matches/next', this.mapCompetitions(this.competitions))
                .subscribe((matches: Match[]) => {
                    this.matchChanged.next(matches.find( (match: Match) => match.id == id));
                });
        } else {
            this.http.post('api/matches/last', this.mapCompetitions(this.competitions))
                .subscribe((matches: Match[]) => {
                    this.matchChanged.next(matches.find( (match: Match) => match.id == id));
                });
        }
    }


    private mapCompetitions(competitions: Competition[]) {
        return competitions.map((competition: Competition) => competition.id)
    }

    setAllMatches() {
        this.matchesChanged.next(this.nextMatches);
    }

    toggleDayFilter(toggle: boolean) {
        this.dayFilterChanged.next(toggle);
    }

    getSpecificMatches = (competitions: Competition[], period: string) => {
        if (competitions.length <= 1) {
            if (period == 'previous') {
                this.matchesChanged.next(this.previousMatches.filter((match: Match) => match.competition == competitions[0].name))
            } else if (period == 'next') {
                this.matchesChanged.next(this.nextMatches.filter((match: Match) => match.competition == competitions[0].name))
            }
        } else {
            if (period == 'previous') {
                this.matchesChanged.next(this.previousMatches);
            } else if (period == 'next') {
                this.matchesChanged.next(this.nextMatches);
            }
        }
    };
}
