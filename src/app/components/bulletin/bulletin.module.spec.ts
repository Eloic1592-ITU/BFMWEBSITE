import { BulletinModule } from './bulletin.module';

describe('BulletinModule', () => {
  let bulletinModule: BulletinModule;

  beforeEach(() => {
    bulletinModule = new BulletinModule();
  });

  it('should create an instance', () => {
    expect(bulletinModule).toBeTruthy();
  });
});
