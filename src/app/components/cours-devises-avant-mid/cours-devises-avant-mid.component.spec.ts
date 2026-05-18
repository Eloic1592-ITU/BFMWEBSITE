import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDevisesAvantMidComponent } from './cours-devises-avant-mid.component';

describe('CoursDevisesAvantMidComponent', () => {
  let component: CoursDevisesAvantMidComponent;
  let fixture: ComponentFixture<CoursDevisesAvantMidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDevisesAvantMidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDevisesAvantMidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
