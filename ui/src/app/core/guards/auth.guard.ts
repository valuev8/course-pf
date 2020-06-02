import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NAVIGATE} from '../app.config';
import {AuthService} from '../auth';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.auth.isAuthorized) {
      return true;
    }

    this.auth.logout();
    this.router.navigate([NAVIGATE.LOGIN]);

    return false;
  }
}
