import { MediasModule } from './medias.module';

describe('MediasModule', () => {
  let mediasModule: MediasModule;

  beforeEach(() => {
    mediasModule = new MediasModule();
  });

  it('should create an instance', () => {
    expect(mediasModule).toBeTruthy();
  });
});
