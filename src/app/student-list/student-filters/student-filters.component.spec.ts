import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFiltersComponent } from './student-filters.component';

describe('StudentFiltersComponent', () => {
  let component: StudentFiltersComponent;
  let fixture: ComponentFixture<StudentFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
