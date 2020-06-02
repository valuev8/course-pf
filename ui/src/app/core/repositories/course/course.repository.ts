import { Injectable } from '@angular/core';
import {HttpService} from '../../http';
import {Course} from '../../domain/course/course.interface';
import {URLS} from '../../app.config';
import {Observable} from 'rxjs';

@Injectable()
export class CourseRepository {

  constructor(private http: HttpService) { }

  getAllCourses(): Observable<Partial<Course>> {
    return this.http.get(URLS.COURSE);
  }

  getCourse(id: string): Observable<Course[]> {
    return this.http.get(`${URLS.COURSE}/id/${id}`);
  }

  getUserCourses(userId: string): Observable<Course> {
    return this.http.get(`${URLS.COURSE}/${userId}`);
  }
}
