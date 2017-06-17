import {clearCache, type} from './type-cache';

describe('Util: type-cache', () => {
  it('Should be throw error when key is not unique', () => {
    clearCache();
    const key = 'test';
    expect(() => type(key)).not.toThrowError();
    expect(() => type(key)).toThrowError(`Action type "${key}" is not unique`);
  })
});
