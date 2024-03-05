import requests

# Replace 'your_api_key_here' with your actual API key
API_KEY = 'your_api_key_here'
url = 'https://phi-2-llm-frank1147.internal.jambit.io/v1/chat/completions'

headers = {
   # 'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json',
}

data = {
    'model': 'phi-2',
    'prompt': 'Say this is a test',
    'temperature': 0,
    'max_tokens': 200,
    'stream': True  # Ensure streaming is enabled if the API supports it
}

# Make a POST request and stream the response
response = requests.post(url, headers=headers, json=data, stream=True)

# Check if the request was successful
if response.status_code == 200:
    # Iterate over the response
    for line in response.iter_lines():
        # Decode each line and print it
        print(line.decode('utf-8'))
else:
    print(f"Error: {response.status_code} - {response.text}")