import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSujetComponent } from './nouveau-sujet.component';

describe('NouveauSujetComponent', () => {
  let component: NouveauSujetComponent;
  let fixture: ComponentFixture<NouveauSujetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauSujetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
