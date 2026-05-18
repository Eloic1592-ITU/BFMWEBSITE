import { ListeActualitesModule } from './liste-actualites.module';

describe('ListeActualitesModule', () => {
  let listeActualitesModule: ListeActualitesModule;

  beforeEach(() => {
    listeActualitesModule = new ListeActualitesModule();
  });

  it('should create an instance', () => {
    expect(listeActualitesModule).toBeTruthy();
  });
});
