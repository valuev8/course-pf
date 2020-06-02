import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chapter} from '../../../../core/domain/course/chapter.interface';
import {CourseNavService} from './course-nav.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'course-pf-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.scss']
})
export class CourseNavComponent implements OnInit {
  @Input() chapters: Chapter[] = [];
  @Input() index: number;

  @Output() chapterSelect: EventEmitter<Chapter> = new EventEmitter();

  activeTab: Observable<string> = this.courseNavService.getActiveTab();

  constructor(private courseNavService: CourseNavService) {}

  ngOnInit() {
    if (this.chapters.length && !this.index) {
      this.setDefaultTab(this.chapters);
      this.courseNavService.getActiveTab().subscribe((res) => console.log('ACTIVE TAB', res));
    }
  }

  selectionChange(chapter: Chapter): void {
    this.chapterSelect.emit(chapter);
    this.courseNavService.setActiveTab(chapter.id);
  }

  setDefaultTab(chapter: Chapter[]): void {
    if (chapter[0].chapters) {
      this.setDefaultTab(chapter[0].chapters);
      return;
    }
    this.selectionChange(chapter[0]);
  }
}
