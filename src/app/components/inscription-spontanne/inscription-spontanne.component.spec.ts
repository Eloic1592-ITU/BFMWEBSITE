import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionSpontanneComponent } from './inscription-spontanne.component';

describe('InscriptionSpontanneComponent', () => {
  let component: InscriptionSpontanneComponent;
  let fixture: ComponentFixture<InscriptionSpontanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionSpontanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionSpontanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
