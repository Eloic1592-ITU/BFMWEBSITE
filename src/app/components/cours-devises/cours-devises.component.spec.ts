import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDevisesComponent } from './cours-devises.component';

describe('CoursDevisesComponent', () => {
  let component: CoursDevisesComponent;
  let fixture: ComponentFixture<CoursDevisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDevisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
