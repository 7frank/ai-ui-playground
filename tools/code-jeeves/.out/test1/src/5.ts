```typescript
function createASTFunction(name: string, params: string[], body: string): string {
    return `
    function ${name}(${params.join(', ')}) {
        ${body}
     }
    `;
}
```
