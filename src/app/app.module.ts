import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { MatchListComponent } from './match-list/match-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { StandingsComponent } from './standings/standings.component';
import {CompetitionService} from './services/competition.service';
import {MatchService} from './services/match.service';
import {StandingsService} from './services/standings.service';
import {RouterModule, Routes} from '@angular/router';
import { MatchComponent } from './match/match.component';

const appRoutes: Routes = [
    { path: '', component: MatchListComponent },
    { path: 'matches/:id', component: MatchComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MenuComponent,
        MatchListComponent,
        StandingsComponent,
        MatchComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        HttpClient,
        CompetitionService,
        MatchService,
        StandingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
