import {EchangeModule} from './echange.module';

describe('EchangeModule', () => {
    let echangeModule: EchangeModule;

    beforeEach(() => {
        echangeModule = new EchangeModule();
    });

    it('should create an instance', () => {
        expect(echangeModule).toBeTruthy();
    });
});
