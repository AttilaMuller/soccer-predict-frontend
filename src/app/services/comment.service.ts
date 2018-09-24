import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../models';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    commentsChanges: Subject<Comment[]> = new BehaviorSubject<Comment[]>([]);
    commentsEmpty: Subject<boolean> = new BehaviorSubject<boolean>(true);
    private comments: Comment[];

    constructor(private userService: UserService, private http: HttpClient) { }

    sendComment(matchId: number, comment: Comment) {
        this.http.post(`api/comment/${matchId}`, comment).subscribe((response: Response) => {
            this.getComments(matchId);
        });
    }

    getComments(matchId: number) {
        this.commentsEmpty.next(true);
        this.http.get(`api/comment/${matchId}`).subscribe((comments: Comment []) => {
            console.log(comments);
            this.comments = comments;
            this.commentsChanges.next(this.comments);
            this.commentsEmpty.next(false);
        })
    }
}
