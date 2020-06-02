import { Injectable } from '@angular/core';
import {HttpService} from '../../http';
import {Course} from '../../domain/course/course.interface';
import {URLS} from '../../app.config';
import {Observable} from 'rxjs';
import {UserData} from '../../auth';

@Injectable()
export class UserRepository {

  constructor(private http: HttpService) { }

  getUsers(): Observable<UserData[]> {
    return this.http.get(URLS.USER);
  }
}
