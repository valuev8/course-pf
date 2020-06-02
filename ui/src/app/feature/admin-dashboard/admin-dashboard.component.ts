import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserData} from '../../core/auth';
import {UserService} from '../../core/domain/user/user.service';

@Component({
  selector: 'course-pf-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  usersList: UserData[] = [];
  displayedColumns: string[] = ['email', 'isReset', 'courses'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: UserData[]) => {
      this.usersList = users;
    });
  }

}
