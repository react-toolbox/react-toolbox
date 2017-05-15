import hasOwnProperty from '../hasOwnProperty';

describe('#hasOwnProperty', () => {
  it('returns true when a given object has a property', () => {
    const obj = { foo: 'bar' };
    expect(hasOwnProperty(obj, 'foo')).toEqual(true);
  });

  it('returns false when a given object doesnt have a property', () => {
    const obj = { foo: 'bar' };
    expect(hasOwnProperty(obj, 'bar')).toEqual(false);
  });
});
