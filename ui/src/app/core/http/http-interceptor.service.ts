import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { HttpService } from './http.service';
import {API_SERVER, TOKEN, URLS} from '../app.config';
import {TokenService} from '../auth/token.service';
import {Injectable} from '@angular/core';
import {HttpError} from './http-error.interface';
import {AuthService} from '../auth/auth.service';

@Injectable({ providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private http: HttpService,
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;

        switch (request.url) {
            case URLS.LOGIN:
                headers = {
                    'Content-Type': 'application/json',
                };
                break;
            default:
                headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.tokenService.token}`,
                };
        }

        const modifiedReq = request.clone({
            url: this.modifyUrl(`${request.url}`),
            setHeaders: headers,
        });

        return next.handle(modifiedReq).pipe(
            map(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.body && event.body[TOKEN]) {
                            this.tokenService.token = event.body[TOKEN];
                        }
                        return event;
                    }
                }
            ),
            catchError((errorResponse: any) => {
                if (errorResponse instanceof HttpErrorResponse) {
                    const error: HttpError = {
                        status: errorResponse.status,
                        message: errorResponse.error.message
                    };

                    if (error.status === 401) {
                        this.authService.logout();
                    }

                    return throwError(error);
                }
            })
        );
    }

    // private getErrorMessage(status: number): string {
    //     switch (status) {
    //         case 400: {
    //             return ERROR_MESSAGES.serverErrorValidate;
    //         }
    //         case 403: {
    //             return ERROR_MESSAGES.unauthorized;
    //         }
    //         case 401: {
    //             return ERROR_MESSAGES.sessionExpired;
    //         }
    //         case 405: {
    //             return ERROR_MESSAGES.testIsOver;
    //         }
    //     }
    // }

    private isUnauthorized(status: number): boolean {
        return status === 403;
    }

    private isExpired(status: number): boolean {
        return status === 401 || status === 405;
    }

    private modifyUrl(collection: string): string {
        return `${API_SERVER + URLS.API + collection}`;
    }
}
