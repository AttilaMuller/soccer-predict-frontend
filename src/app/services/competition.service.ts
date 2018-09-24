import { Injectable } from '@angular/core';
import {Competition} from '../models';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    competitionsChanged: Subject<Array<Competition>> = new BehaviorSubject <Array<Competition>>([]);
    competitions: Competition[] = [];
    allCompetitions: Competition[] = [];

    constructor() {
        this.competitions.push(<Competition>{
            id: 2001,
            name: 'UEFA Champions League',
            area: 'Europe',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-european-union2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2021,
            name: 'Premier League',
            area: 'England',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-england2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2016,
            name: 'Championship',
            area: 'England',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-england2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2002,
            name: 'Bundesliga',
            area: 'Germany',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-germany2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2014,
            name: 'Primera Division',
            area: 'Spain',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-spain2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2019,
            name: 'Serie A',
            area: 'Italy',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-italy2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2015,
            name: 'Ligue 1',
            area: 'France',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-france2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2017,
            name: 'Primeira Liga',
            area: 'Portugal',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-portugal2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2003,
            name: 'Eredivisie',
            area: 'Netherlands',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-the-netherlands2x.png'
        });
        this.competitions.push(<Competition>{
            id: 2013,
            name: 'Série A',
            area: 'Brasil',
            pictureUrl: 'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-brazil2x.png'
        });
        this.allCompetitions = this.competitions;
        this.competitionsChanged.next(this.competitions);
    }

    setCompetitions(competitions: number[]) {
        this.competitions = [this.allCompetitions.find((competition: Competition) => competition.id == competitions[0])];
        this.competitionsChanged.next(this.competitions);
    }

    getAllCompetitions() {
        return this.allCompetitions;
    }

    setAllCompetitions() {
        this.competitionsChanged.next(this.allCompetitions);
    }

}
