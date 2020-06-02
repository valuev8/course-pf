import {Component, OnInit} from '@angular/core';
import {Course} from '../../../core/domain/course/course.interface';
import {CourseService} from '../../../core/domain/course/course.service';
import {switchMap, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Chapter} from '../../../core/domain/course/chapter.interface';

@Component({
  selector: 'course-pf-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  selectedChapter: Chapter;


  constructor(private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCourse();
  }

  chapterSelect(chapter: Chapter): void {
    this.selectedChapter = chapter;
    console.log(chapter);
  }

  initCourse(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        if (!this.course) {
          return this.getCourse(params.get('id'));
        }
        return of(window.history.state.course);
      }),
      take(1)
    ).subscribe((course) => this.course = course);
  }

  getCourse(id: string): Observable<Course> {
    return this.courseService.getCourse(id);
  }
}
