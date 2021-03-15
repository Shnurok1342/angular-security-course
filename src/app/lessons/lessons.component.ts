import { Observable } from 'rxjs';
import {Lesson} from '../model/lesson';
import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../services/lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;

  constructor(
    private lessonsService: LessonsService
  ) {}

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons();
  }
}
