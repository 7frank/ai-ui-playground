
import installPackages from './3';

describe('installPackages function', () => {
  it('should install cmd-ts when called', () => {
    expect(installPackages().includes('cmd-ts')).toBe(true);
  });

  it('should install bun when called', () => {
    expect(installPackages().includes('bun')).toBe(true);
  });

  it('should install inquirer when called', () => {
    expect(installPackages().includes('inquirer')).toBe(true);
  });

  it('should install zod when called', () => {
    expect(installPackages().includes('zod')).toBe(true);
  });

  it('should install lodash-es when called', () => {
    expect(installPackages().includes('lodash-es')).toBe(true);
  });

  it('should install dayjs when called', () => {
    expect(installPackages().includes('dayjs')).toBe(true);
  });

  it('should install jest when called', () => {
    expect(installPackages().includes('jest')).toBe(true);
  });
});
