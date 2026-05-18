import { InflationFonctionModule } from './inflation-fonction.module';

describe('InflationFonctionModule', () => {
  let inflationFonctionModule: InflationFonctionModule;

  beforeEach(() => {
    inflationFonctionModule = new InflationFonctionModule();
  });

  it('should create an instance', () => {
    expect(inflationFonctionModule).toBeTruthy();
  });
});
