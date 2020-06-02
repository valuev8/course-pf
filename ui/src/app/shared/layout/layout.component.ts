import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ThemeService} from '../../core/theme/theme.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from '../../core/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'course-pf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  isDarkTheme: Observable<boolean>;
  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  constructor(private themeService: ThemeService,
              private changeDetectorRef: ChangeDetectorRef,
              private authService: AuthService,
              private router: Router,
              private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logOut(): void {
    this.authService.logout();
  }

  get isAdmin(): boolean {
    return this.authService.userData.isAdmin;
  }

}
