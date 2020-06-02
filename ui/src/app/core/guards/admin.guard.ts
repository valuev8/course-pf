import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NAVIGATE} from '../app.config';
import {AuthService} from '../auth';

@Injectable({ providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.auth.isAuthorized && this.auth.userData.isAdmin) {
      return true;
    }

    this.router.navigate([NAVIGATE.NOT_FOUND]);

    return false;
  }
}
