import os

from openai import OpenAI
import openai

# Load environment variables
SERVER_URL = os.getenv('SERVER_URL')
PROXY_API_KEY = "sk-...lQa" #os.getenv('PROXY_API_KEY')
OPENAI_API_KEY= "foo_daf44c40-6269-495b-b1ec-576b26f6ee02" # os.getenv('OPENAI_API_KEY')

print("SERVER_URL",SERVER_URL)
print("PROXY_API_KEY",PROXY_API_KEY)
print("OPENAI_API_KEY",OPENAI_API_KEY)
client = OpenAI(
    api_key= OPENAI_API_KEY,
    base_url = f'{SERVER_URL}/{PROXY_API_KEY}/v1'

)




try:
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
except openai.APIConnectionError as e:
    print("The server could not be reached")
    print(e.__cause__)  # an underlying Exception, likely raised within httpx.
except openai.RateLimitError as e:
    print("A 429 status code was received; we should back off a bit.")
except openai.APIStatusError as e:
    print("Another non-200-range status code was received")
    print(e.status_code)
    print(e.response)