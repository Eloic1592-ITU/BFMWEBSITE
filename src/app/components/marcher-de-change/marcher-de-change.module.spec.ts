import { MarcherDeChangeModule } from './marcher-de-change.module';

describe('MarcherDeChangeModule', () => {
  let marcherDeChangeModule: MarcherDeChangeModule;

  beforeEach(() => {
    marcherDeChangeModule = new MarcherDeChangeModule();
  });

  it('should create an instance', () => {
    expect(marcherDeChangeModule).toBeTruthy();
  });
});
