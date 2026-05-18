import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActualiteComponent } from './detail-actualite.component';

describe('DetailActualiteComponent', () => {
  let component: DetailActualiteComponent;
  let fixture: ComponentFixture<DetailActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
