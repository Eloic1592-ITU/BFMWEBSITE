import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatDuMarcheComponent } from './resultat-du-marche.component';

describe('ResultatDuMarcheComponent', () => {
  let component: ResultatDuMarcheComponent;
  let fixture: ComponentFixture<ResultatDuMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatDuMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatDuMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
