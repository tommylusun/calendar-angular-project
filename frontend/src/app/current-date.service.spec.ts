import { TestBed, inject } from '@angular/core/testing';

import { CurrentDateService } from './current-date.service';

describe('CurrentDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentDateService]
    });
  });

  it('should be created', inject([CurrentDateService], (service: CurrentDateService) => {
    expect(service).toBeTruthy();
  }));
});
