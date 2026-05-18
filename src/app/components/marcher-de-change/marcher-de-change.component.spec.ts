import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcherDeChangeComponent } from './marcher-de-change.component';

describe('MarcherDeChangeComponent', () => {
  let component: MarcherDeChangeComponent;
  let fixture: ComponentFixture<MarcherDeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcherDeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcherDeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
