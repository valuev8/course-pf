import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import {UserService} from '../../core/domain/user/user.service';
import {UserRepository} from '../../core/repositories/user/user.repository';



@NgModule({
  declarations: [
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule
  ],
  providers: [
    UserService,
    UserRepository,
  ]
})
export class AdminModule { }
