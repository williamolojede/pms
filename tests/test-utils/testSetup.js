import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

export { init } from '../../src/server';
export { default as models } from '../../src/api/models';

chai.use(chaiAsPromised);
export const { expect } = chai;
