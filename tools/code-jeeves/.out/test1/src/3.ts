```typescript
import { execSync } from "child_process";

function executeBunShellCommand(command: string): string {
    try {
        return execSync(`bun shell ${command}`).toString();
    } catch (error) {
        throw new Error(`Failed to execute bun shell command: ${command}`);
    }
}
```

Note: This implementation assumes that `bun` and `bun shell` commands are installed and available globally.
