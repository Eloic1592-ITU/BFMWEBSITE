import { ResultatDuMarcheModule } from './resultat-du-marche.module';

describe('ResultatDuMarcheModule', () => {
  let resultatDuMarcheModule: ResultatDuMarcheModule;

  beforeEach(() => {
    resultatDuMarcheModule = new ResultatDuMarcheModule();
  });

  it('should create an instance', () => {
    expect(resultatDuMarcheModule).toBeTruthy();
  });
});
