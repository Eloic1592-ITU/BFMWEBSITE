import { InscriptionSpontanneModule } from './inscription-spontanne.module';

describe('InscriptionSpontanneModule', () => {
  let inscriptionSpontanneModule: InscriptionSpontanneModule;

  beforeEach(() => {
    inscriptionSpontanneModule = new InscriptionSpontanneModule();
  });

  it('should create an instance', () => {
    expect(inscriptionSpontanneModule).toBeTruthy();
  });
});
