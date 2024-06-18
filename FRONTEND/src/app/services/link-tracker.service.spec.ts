import { TestBed } from '@angular/core/testing';

import { LinkTrackerService } from './link-tracker.service';

describe('LinkTrackerService', () => {
  let service: LinkTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
