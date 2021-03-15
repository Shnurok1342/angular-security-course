import {HttpClient} from '@angular/common/http';
import {Lesson} from '../model/lesson';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LessonsService {
  constructor(private http: HttpClient) {}

  loadAllLessons() {
    return this.http.get<{ lessons: Lesson[] }>('/api/lessons')
      .pipe(
        map(res => res.lessons)
      );
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('/api/lessons/' + id);
  }
}
