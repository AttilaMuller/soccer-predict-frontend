import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../models';
import {MatchService} from '../services/match.service';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

    activeMatch: Match;

    constructor(private route: ActivatedRoute, private matchService: MatchService) { }

    ngOnInit() {
        this.activeMatch = this.matchService.getOneMatch(this.route.snapshot.params['id']);
    }

}
