import { DocumentFilterModule } from './document-filter.module';

describe('DocumentFilterModule', () => {
  let documentFilterModule: DocumentFilterModule;

  beforeEach(() => {
    documentFilterModule = new DocumentFilterModule();
  });

  it('should create an instance', () => {
    expect(documentFilterModule).toBeTruthy();
  });
});
