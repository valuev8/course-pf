import { Injectable } from '@angular/core';
import {CourseRepository} from '../../repositories/course/course.repository';
import {Observable} from 'rxjs';
import {Course} from './course.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class CourseService {

  constructor(private courseRepository: CourseRepository) { }

  getAllCourses(): Observable<Partial<Course>> {
    return this.courseRepository.getAllCourses();
  }

  getCourse(id: string): Observable<Course> {
    return this.courseRepository.getCourse(id).pipe(
      map((courses: Course[]) => courses[0])
    );
  }

  getUserCourses(userId: string): Observable<Course> {
    return this.courseRepository.getUserCourses(userId);
  }
}
