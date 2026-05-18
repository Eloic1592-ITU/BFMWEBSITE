import { TabeauCoursDevisesModule } from './tabeau-cours-devises.module';

describe('TabeauCoursDevisesModule', () => {
  let tabeauCoursDevisesModule: TabeauCoursDevisesModule;

  beforeEach(() => {
    tabeauCoursDevisesModule = new TabeauCoursDevisesModule();
  });

  it('should create an instance', () => {
    expect(tabeauCoursDevisesModule).toBeTruthy();
  });
});
