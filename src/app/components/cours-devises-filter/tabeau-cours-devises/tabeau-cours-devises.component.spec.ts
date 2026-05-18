import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabeauCoursDevisesComponent } from './tabeau-cours-devises.component';

describe('TabeauCoursDevisesComponent', () => {
  let component: TabeauCoursDevisesComponent;
  let fixture: ComponentFixture<TabeauCoursDevisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabeauCoursDevisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabeauCoursDevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
