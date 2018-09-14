import { Injectable } from '@angular/core';
import {Competition, Match} from '../models';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    matchesChanged: Subject<Array<Match>> = new BehaviorSubject<Array<Match>>([]);
    dayFilterChanged: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private previousMatches: Match[] = [];
    private nextMatches: Match[] = [];

    constructor(private http: HttpClient) {
    }

    getMatches = (competitions: Competition[]) => {
        this.http.post('api/matches/last', this.mapCompetitions(competitions))
            .subscribe((matches: Match[]) => {
                this.previousMatches = matches;
            });
        this.http.post('api/matches/next', this.mapCompetitions(competitions))
            .subscribe((matches: Match[]) => {
                this.nextMatches = matches;
                this.matchesChanged.next(this.nextMatches);
            });
    };

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
