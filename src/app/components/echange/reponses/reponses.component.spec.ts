import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsesComponent } from './reponses.component';

describe('ReponsesComponent', () => {
  let component: ReponsesComponent;
  let fixture: ComponentFixture<ReponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
