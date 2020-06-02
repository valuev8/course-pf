import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import {HttpService} from '../http/http.service';
import {NAVIGATE, URLS} from '../app.config';
import {LoginData, UserData, UserLoginData} from './auth.models';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    isAuthorized = !!this.tokenService.token;

    constructor(
        private httpService: HttpService,
        private tokenService: TokenService,
        private router: Router,
    ) {}

    loginUser(userLoginData: UserLoginData): Observable<LoginData> {
        return this.httpService.post(URLS.LOGIN, userLoginData).pipe(
            tap((response: LoginData): void => {
                this.tokenService.token = response.token;
                this.isAuthorized = true;
            }),
        );
    }

    changePassword(password: string): Observable<void> {
        return this.httpService.put(URLS.USER, {id: this.userData._id, password});
    }

    logout(): void {
        if (this.tokenService.token) {
            this.tokenService.clearTokens();
            this.isAuthorized = false;
            this.router.navigate([NAVIGATE.LOGIN]);
        }
    }

    // TODO: move userData to new User Service
    get userData(): UserData {
        return jwt_decode(this.tokenService.token);
    }
}
