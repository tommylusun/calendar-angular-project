import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewTableComponent } from './month-view-table.component';

describe('MonthViewTableComponent', () => {
  let component: MonthViewTableComponent;
  let fixture: ComponentFixture<MonthViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
