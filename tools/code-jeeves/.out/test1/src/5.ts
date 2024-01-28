```typescript
import { z } from "zod";

const FilePathsSchema = z.array(z.string());

type FilePath = z.infer<typeof FilePathsSchema>;

function createNewFunction(filePaths: FilePath[]): void {
  // Your code here
}
```
