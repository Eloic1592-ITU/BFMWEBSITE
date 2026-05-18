import { EvolutionTauxDirecteurModule } from './evolution-taux-directeur.module';

describe('EvolutionTauxDirecteurModule', () => {
  let evolutionTauxDirecteurModule: EvolutionTauxDirecteurModule;

  beforeEach(() => {
    evolutionTauxDirecteurModule = new EvolutionTauxDirecteurModule();
  });

  it('should create an instance', () => {
    expect(evolutionTauxDirecteurModule).toBeTruthy();
  });
});
