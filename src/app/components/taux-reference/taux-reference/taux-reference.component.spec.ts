import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxReferenceComponent } from './taux-reference.component';

describe('TauxReferenceComponent', () => {
  let component: TauxReferenceComponent;
  let fixture: ComponentFixture<TauxReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
