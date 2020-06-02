import { TestBed } from '@angular/core/testing';

import { CourseNavService } from './course-nav.service';

describe('CourseNavService', () => {
  let service: CourseNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
