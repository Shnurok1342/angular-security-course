import { Observable } from 'rxjs';
import {Lesson} from '../model/lesson';
import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../services/lessons.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private lessonsService: LessonsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
