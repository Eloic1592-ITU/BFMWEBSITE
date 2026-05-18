import { InflationSecteurProductionModule } from './inflation-secteur-production.module';

describe('InflationSecteurProductionModule', () => {
  let inflationSecteurProductionModule: InflationSecteurProductionModule;

  beforeEach(() => {
    inflationSecteurProductionModule = new InflationSecteurProductionModule();
  });

  it('should create an instance', () => {
    expect(inflationSecteurProductionModule).toBeTruthy();
  });
});
