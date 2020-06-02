import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HttpInterceptorService} from './http';
import {TokenService} from './auth';
import {HttpService} from './http';
import {AuthService} from './auth';
import {ThemeService} from './theme/theme.service';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';

@NgModule({
    imports: [],
    providers: [
        // AuthentificationGuard,
        // LoginGuard,
        AuthService,
        // NotificationService,
        HttpService,
        TokenService,
        ThemeService,
        AuthGuard,
        AdminGuard,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ],
})
export class CoreModule {
}
