import {environment} from '../../environments/environment';

export const API_SERVER = environment.URL_SERVER;
export const TOKEN = 'token';

export enum URLS {
    API = 'api/',
    USER = 'user',
    COURSE = 'course',
    LOGIN = 'login',
}

export enum NAVIGATE {
    LOGIN = 'login',
    COURSE = 'course',
    ADMIN = 'admin',
    NOT_FOUND = '404'
}
