import { TextesReglementairesModule } from './textes-reglementaires.module';

describe('TextesReglementairesModule', () => {
  let textesReglementairesModule: TextesReglementairesModule;

  beforeEach(() => {
    textesReglementairesModule = new TextesReglementairesModule();
  });

  it('should create an instance', () => {
    expect(textesReglementairesModule).toBeTruthy();
  });
});
