```typescript
import { spawnSync } from 'child_process';

const generateTests = (input: string): void => {
  const cmd = `cmd-ts generate-tests ${input}`;
  spawnSync(cmd, { shell: true, stdio: 'inherit' };
}

export default generateTests;
```
