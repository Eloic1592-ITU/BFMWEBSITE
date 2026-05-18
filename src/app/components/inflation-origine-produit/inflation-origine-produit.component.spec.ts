import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflationOrigineProduitComponent } from './inflation-origine-produit.component';

describe('InflationOrigineProduitComponent', () => {
  let component: InflationOrigineProduitComponent;
  let fixture: ComponentFixture<InflationOrigineProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflationOrigineProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflationOrigineProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
