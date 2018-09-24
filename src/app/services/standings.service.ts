import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Competition, Standing, UefaStanding} from '../models';
import {HttpClient} from '@angular/common/http';
import {CompetitionService} from './competition.service';

@Injectable({
    providedIn: 'root'
})
export class StandingsService {

    private competitions: Competition[];

    standingsChanged: Subject<Array<Standing>> = new BehaviorSubject<Array<Standing>>([]);
    uefaStandingsChanged: Subject<Array<UefaStanding>> = new BehaviorSubject<Array<UefaStanding>>([]);
    standingsToggled: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private competitionService: CompetitionService) {
        this.competitionService.competitionsChanged.subscribe((competitions: Competition[]) => this.competitions = competitions);
    }

    setStanding = () => {
        this.standingsChanged.next([]);
        if(this.competitions[0].id == 2001){
            this.setUefaStanding();
        } else {
            this.http.get(`api/standings/${this.competitions[0].id}`)
                .subscribe((standings: Standing[]) => this.standingsChanged.next(standings));
        }
    };

    setUefaStanding = () => {
        this.http.get("api/standings/2001")
            .subscribe((standings: UefaStanding[]) => this.uefaStandingsChanged.next(standings));
    };

    setStandingsToggled(standingsToggled: boolean) {
        this.standingsToggled.next(standingsToggled);
    }

}
