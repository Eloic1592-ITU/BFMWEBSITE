import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InflationSecteurProductionComponent } from './inflation-secteur-production.component';

describe('InflationSecteurProductionComponent', () => {
  let component: InflationSecteurProductionComponent;
  let fixture: ComponentFixture<InflationSecteurProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InflationSecteurProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InflationSecteurProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
