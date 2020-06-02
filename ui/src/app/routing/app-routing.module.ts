import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NAVIGATE} from '../core/app.config';
import {AuthGuard} from '../core/guards/auth.guard';
import {AdminGuard} from '../core/guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: `/${NAVIGATE.COURSE}`, pathMatch: 'full' },
  {
    path: NAVIGATE.COURSE,
    loadChildren: () => import('../feature/course/course.module').then(m => m.CourseModule),
    canActivate: [AuthGuard],
  },
  {
    path: NAVIGATE.LOGIN,
    loadChildren: () => import('../feature/login/login.module').then(m => m.LoginModule)
  },
  {
    path: NAVIGATE.ADMIN,
    loadChildren: () => import('../feature/admin-dashboard/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
