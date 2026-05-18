import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommuniqueComponent } from './detail-communique.component';

describe('DetailCommuniqueComponent', () => {
  let component: DetailCommuniqueComponent;
  let fixture: ComponentFixture<DetailCommuniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCommuniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCommuniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
