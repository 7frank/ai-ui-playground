```typescript
async function generateFunction(): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
    body: JSON.stringify({
      prompt: 'Generate a function that...',
      max_tokens: 100,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });

  const json = await response.json();
  return json.choices[0].text.trim();
}
```
