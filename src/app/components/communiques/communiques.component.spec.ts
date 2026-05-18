import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuniquesComponent } from './communiques.component';

describe('CommuniquesComponent', () => {
  let component: CommuniquesComponent;
  let fixture: ComponentFixture<CommuniquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommuniquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommuniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
