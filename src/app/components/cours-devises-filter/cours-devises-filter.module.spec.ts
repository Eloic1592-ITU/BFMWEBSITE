import { CoursDevisesFilterModule } from './cours-devises-filter.module';

describe('CoursDevisesFilterModule', () => {
  let coursDevisesFilterModule: CoursDevisesFilterModule;

  beforeEach(() => {
    coursDevisesFilterModule = new CoursDevisesFilterModule();
  });

  it('should create an instance', () => {
    expect(coursDevisesFilterModule).toBeTruthy();
  });
});
