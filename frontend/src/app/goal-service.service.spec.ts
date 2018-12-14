import { TestBed, inject } from '@angular/core/testing';

import { GoalServiceService } from './goal-service.service';

describe('GoalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalServiceService]
    });
  });

  it('should be created', inject([GoalServiceService], (service: GoalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
