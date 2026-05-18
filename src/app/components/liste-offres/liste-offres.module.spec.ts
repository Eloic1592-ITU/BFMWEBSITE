import { ListeOffresModule } from './liste-offres.module';

describe('ListeOffresModule', () => {
  let listeOffresModule: ListeOffresModule;

  beforeEach(() => {
    listeOffresModule = new ListeOffresModule();
  });

  it('should create an instance', () => {
    expect(listeOffresModule).toBeTruthy();
  });
});
