import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpService {
    private spinnerState: Subject<boolean> = new Subject();

    constructor(private http: HttpClient) {}

    get(url: string, options?: any): Observable<any> {
        this.setSpinnerShow(true);

        return this.http.get(url, options).pipe(
            finalize(() => {
                this.setSpinnerShow(false);
            }),
        );
    }

    post(url: string, body: any, options?: any): Observable<any> {
        this.setSpinnerShow(true);

        return this.http.post(url, body, options).pipe(
            finalize(() => {
                this.setSpinnerShow(false);
            }),
        );
    }

    put(url: string, body: any, options?: any): Observable<any> {
        this.setSpinnerShow(true);

        return this.http.put(url, body, options).pipe(
            finalize(() => {
                this.setSpinnerShow(false);
            }),
        );
    }

    delete(url: string, options?: any): Observable<any> {
        this.setSpinnerShow(true);

        return this.http.delete(url, options).pipe(
            finalize(() => {
                this.setSpinnerShow(false);
            }),
        );
    }

    spinnerStateChanged(): Observable<boolean> {
        return this.spinnerState.asObservable();
    }

    private setSpinnerShow(isVisible: boolean): void {
        this.spinnerState.next(isVisible);
    }
}
