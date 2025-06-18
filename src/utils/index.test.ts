import { getInitials } from './index';

describe('getInitials', () => {
  it('returns initials for a full name', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Ada Lovelace')).toBe('AL');
  });
  it('returns single initial for one name', () => {
    expect(getInitials('Plato')).toBe('P');
  });
  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
