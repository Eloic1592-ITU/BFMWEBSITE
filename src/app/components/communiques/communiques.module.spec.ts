import { CommuniquesModule } from './communiques.module';

describe('CommuniquesModule', () => {
  let communiquesModule: CommuniquesModule;

  beforeEach(() => {
    communiquesModule = new CommuniquesModule();
  });

  it('should create an instance', () => {
    expect(communiquesModule).toBeTruthy();
  });
});
