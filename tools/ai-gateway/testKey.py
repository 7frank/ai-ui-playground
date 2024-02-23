import os

from openai import OpenAI


# Load environment variables
SERVER_URL = os.getenv('SERVER_URL')
PROXY_API_KEY = os.getenv('PROXY_API_KEY')

client = OpenAI(
    api_key= '',
    base_url = f'{SERVER_URL}/{PROXY_API_KEY}/v1'

)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content":  "say 'hello'",
        }
    ],
    model="gpt-3.5-turbo",
)


print(chat_completion.choices[0].text.strip())
