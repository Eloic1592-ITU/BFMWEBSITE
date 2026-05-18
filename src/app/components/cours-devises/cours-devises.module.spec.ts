import { CoursDevisesModule } from './cours-devises.module';

describe('CoursDevisesModule', () => {
  let coursDevisesModule: CoursDevisesModule;

  beforeEach(() => {
    coursDevisesModule = new CoursDevisesModule();
  });

  it('should create an instance', () => {
    expect(coursDevisesModule).toBeTruthy();
  });
});
