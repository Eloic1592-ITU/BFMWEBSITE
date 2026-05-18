import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflationFonctionComponent } from './inflation-fonction.component';

describe('InflationFonctionComponent', () => {
  let component: InflationFonctionComponent;
  let fixture: ComponentFixture<InflationFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflationFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflationFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
