import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDateItemComponent } from './table-date-item.component';

describe('TableDateItemComponent', () => {
  let component: TableDateItemComponent;
  let fixture: ComponentFixture<TableDateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
