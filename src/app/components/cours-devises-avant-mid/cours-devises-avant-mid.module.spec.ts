import { CoursDevisesAvantMidModule } from './cours-devises-avant-mid.module';

describe('CoursDevisesAvantMidModule', () => {
  let coursDevisesAvantMidModule: CoursDevisesAvantMidModule;

  beforeEach(() => {
    coursDevisesAvantMidModule = new CoursDevisesAvantMidModule();
  });

  it('should create an instance', () => {
    expect(coursDevisesAvantMidModule).toBeTruthy();
  });
});
