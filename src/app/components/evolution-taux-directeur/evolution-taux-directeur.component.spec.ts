import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionTauxDirecteurComponent } from './evolution-taux-directeur.component';

describe('EvolutionTauxDirecteurComponent', () => {
  let component: EvolutionTauxDirecteurComponent;
  let fixture: ComponentFixture<EvolutionTauxDirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionTauxDirecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionTauxDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
