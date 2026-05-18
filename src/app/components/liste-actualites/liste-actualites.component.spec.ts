import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeActualitesComponent } from './liste-actualites.component';

describe('ListeActualitesComponent', () => {
  let component: ListeActualitesComponent;
  let fixture: ComponentFixture<ListeActualitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeActualitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeActualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
