import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateursComponent } from './indicateurs.component';

describe('IndicateursComponent', () => {
  let component: IndicateursComponent;
  let fixture: ComponentFixture<IndicateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
