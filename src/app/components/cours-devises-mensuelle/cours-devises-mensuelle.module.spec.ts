import { CoursDevisesMensuelleModule } from './cours-devises-mensuelle.module';

describe('CoursDevisesMensuelleModule', () => {
  let coursDevisesMensuelleModule: CoursDevisesMensuelleModule;

  beforeEach(() => {
    coursDevisesMensuelleModule = new CoursDevisesMensuelleModule();
  });

  it('should create an instance', () => {
    expect(coursDevisesMensuelleModule).toBeTruthy();
  });
});
