import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemSummaryComponent } from './task-item-summary.component';

describe('TaskItemSummaryComponent', () => {
  let component: TaskItemSummaryComponent;
  let fixture: ComponentFixture<TaskItemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
