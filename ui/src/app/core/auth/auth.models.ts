import {Course} from '../domain/course/course.interface';

export interface LoginData {
    expires_in: string;
    token: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface UserData extends UserLoginData {
    _id: string;
    courses: Course[];
    isAdmin: boolean;
    isReset?: boolean;
}
