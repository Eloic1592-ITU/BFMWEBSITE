import { InflationOrigineProduitModule } from './inflation-origine-produit.module';

describe('InflationOrigineProduitModule', () => {
  let inflationOrigineProduitModule: InflationOrigineProduitModule;

  beforeEach(() => {
    inflationOrigineProduitModule = new InflationOrigineProduitModule();
  });

  it('should create an instance', () => {
    expect(inflationOrigineProduitModule).toBeTruthy();
  });
});
