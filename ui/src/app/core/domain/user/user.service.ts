import { Injectable } from '@angular/core';
import {UserRepository} from '../../repositories/user/user.repository';
import {Observable} from 'rxjs';
import {UserData} from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository) { }

  getUsers(): Observable<UserData[]> {
    return this.userRepository.getUsers();
  }
}
