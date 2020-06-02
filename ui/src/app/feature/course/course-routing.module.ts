import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseComponent} from './course.component';
import {CourseDetailsComponent} from './course-details/course-details.component';


const routes: Routes = [
  { path: '', component: CourseComponent},
  { path: ':id', component: CourseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
