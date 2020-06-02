import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseNavService {
  activeTab: BehaviorSubject<string> = new BehaviorSubject('');

  getActiveTab(): Observable<string> {
    return this.activeTab.asObservable();
  }

  setActiveTab(tabId: string): void {
    this.activeTab.next(tabId);
  }
}
