import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTexteReglementaireComponent } from './detail-texte-reglementaire.component';

describe('DetailTexteReglementaireComponent', () => {
  let component: DetailTexteReglementaireComponent;
  let fixture: ComponentFixture<DetailTexteReglementaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTexteReglementaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTexteReglementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
