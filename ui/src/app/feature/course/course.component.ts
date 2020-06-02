import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../../core/domain/course/course.interface';
import {CourseService} from '../../core/domain/course/course.service';
import {AuthService} from '../../core/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'course-pf-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  allCourses: Observable<Partial<Course>>;
  userCourses: Observable<Course>;

  constructor(private courseService: CourseService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.allCourses = this.courseService.getAllCourses();
    this.userCourses = this.courseService.getUserCourses(this.authService.userData._id);
  }

  startCourse(course: Course): void {
    this.router.navigateByUrl(`course/${course._id}`, { state: { course } });
  }

}
