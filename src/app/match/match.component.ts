import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Competition, Match, Comment, User} from '../models';
import {MatchService} from '../services/match.service';
import {CompetitionService} from '../services/competition.service';
import {
    faBolt,
    faCalendarAlt,
    faClock,
    faCommentAlt,
    faComments,
    faInfoCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';

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
    commentIcon = faCommentAlt;
    trashIcon = faTrashAlt;

    basicMatchInfo: Match = null;
    allCompetitions: Competition[] = [];
    commentToggled = false;
    comments: Comment[];
    commentValue: string;
    matchId: number;
    user: User;
    commentsEmpty: boolean;

    constructor(private route: ActivatedRoute, private matchService: MatchService, private competitionService: CompetitionService,
                private commentService: CommentService, private userService: UserService) {}

    ngOnInit() {
        this.userService.userChanged.subscribe((user: User) => this.user = user);
        this.commentService.commentsChanges.subscribe((comments: Comment[]) => this.comments = comments);
        this.commentService.commentsEmpty.subscribe( (bool: boolean) => this.commentsEmpty = bool);
        this.matchService.matchChanged.subscribe((match: Match) => this.basicMatchInfo = match);
        this.route.params.subscribe((params: Params) => {
            this.matchId = params['id'];
            this.matchService.getMatch(params['id'], params['date']);
        });
        this.allCompetitions = this.competitionService.getAllCompetitions();
        this.commentService.getComments(this.matchId);
    }

    toggleComment() {
        this.commentToggled = !this.commentToggled;
    }

    getCompetitionImage(name: string) {
        return this.allCompetitions.find(competition => competition.name == name).pictureUrl;
    }

    sendComment() {
        this.commentService.sendComment(this.matchId, {
            userId: this.user.gid,
            fullName: this.user.fullName,
            picture: this.user.picture,
            content: this.commentValue,
            date: new Date().toISOString()
        });
        this.commentToggled = false;
        this.commentValue = null;
    }

    deleteComment(matchId: number, comment: Comment) {
        this.commentService.deleteComment(matchId, comment);
    }

}
