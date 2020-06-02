import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DARK, LIGHT, THEME_KEY} from './theme.config';

@Injectable()
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(localStorage.getItem(THEME_KEY) === DARK);
  isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem(THEME_KEY, `${isDarkTheme ? DARK : LIGHT}`);
    this.darkTheme.next(isDarkTheme);
  }
}
