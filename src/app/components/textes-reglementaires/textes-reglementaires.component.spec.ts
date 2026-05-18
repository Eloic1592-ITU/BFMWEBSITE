import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextesReglementairesComponent } from './textes-reglementaires.component';

describe('TextesReglementairesComponent', () => {
  let component: TextesReglementairesComponent;
  let fixture: ComponentFixture<TextesReglementairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextesReglementairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextesReglementairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
