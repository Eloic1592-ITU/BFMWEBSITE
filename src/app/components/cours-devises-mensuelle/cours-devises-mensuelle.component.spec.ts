import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDevisesMensuelleComponent } from './cours-devises-mensuelle.component';

describe('CoursDevisesMensuelleComponent', () => {
  let component: CoursDevisesMensuelleComponent;
  let fixture: ComponentFixture<CoursDevisesMensuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDevisesMensuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDevisesMensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
