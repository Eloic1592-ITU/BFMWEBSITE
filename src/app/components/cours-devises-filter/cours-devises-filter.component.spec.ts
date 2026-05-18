import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDevisesFilterComponent } from './cours-devises-filter.component';

describe('CoursDevisesFilterComponent', () => {
  let component: CoursDevisesFilterComponent;
  let fixture: ComponentFixture<CoursDevisesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDevisesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDevisesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
