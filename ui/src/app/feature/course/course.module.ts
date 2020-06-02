import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {SharedModule} from '../../shared/shared.module';
import {CourseService} from '../../core/domain/course/course.service';
import {CourseRepository} from '../../core/repositories/course/course.repository';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CourseDetailsComponent } from './course-details/course-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CourseNavComponent } from './course-details/course-nav/course-nav.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CourseNavService} from './course-details/course-nav/course-nav.service';



@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailsComponent,
    CourseNavComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    MatStepperModule,
    MatExpansionModule,
  ],
  exports: [
    CourseComponent
  ],
  providers: [
    CourseService,
    CourseRepository,
    CourseNavService,
  ]
})
export class CourseModule { }
