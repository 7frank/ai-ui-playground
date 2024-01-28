# code-jeeves

To install dependencies:

```bash

npm install -g bun

sudo apt-get install pv

bun install
```

To run:

```bash
bun run index.ts

bun index.ts refactor documentation -p=*.ts

bun index.ts refactor documentation -p=*.ts --dryRun

bun index.ts generate program -n .out/test1

```

This project was created using `bun init` in bun v1.0.23. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Troubleshooting

- GPT3.5-turbo seems to sometimes remove docuemtnation entirely for prompts that explicitly require it to add doc blocs.
  - but at least seems to be quite inexpensive
- gpt4-turbo seems to ahve different problems

# todo

whole work flow explained:
https://chat.openai.com/share/36d638c1-388b-4665-afb8-0de5cc359331

- add debug information to the commit for comparing for example models and results
- check for max token quota

```javascript
import axios from 'axios';

async function getBillingUsage(start_date: string, end_date: string): Promise<any> {
  try {
    const url = `https://api.openai.com/dashboard/billing/usage?start_date=${start_date}&end_date=${end_date}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching billing usage data:", error);
    throw error;
  }
}

// Usage
const startDate = '2023-05-01';
const endDate = '2023-05-11';
getBillingUsage(startDate, endDate)
  .then(data => {
    console.log("Billing usage data:", data);
  })
  .catch(error => {
    console.log("Error:", error);
  });

```
