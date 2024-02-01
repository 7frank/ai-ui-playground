

import { InitializeProject } from './2.';
import { getLanguageFromExtension } from './utils';

describe('InitializeProject', () => {
  it('should create a package.json file', () => {
    const project = new InitializeProject('./');
    project.initialize();
    expect(project.files).toContain('package.json');
  });

  it('should infer the language from the extension', () => {
    const project = new InitializeProject('./');
    const language = getLanguageFromExtension('');
    expect(project.language).toBe(language);
  });

  it('should import the InitializeProject function from ./2.', () => {
    const { InitializeProject } = require('./2.');
    expect(typeof InitializeProject).toBe('function');
  });
});
