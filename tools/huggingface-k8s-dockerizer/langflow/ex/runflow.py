from langflow import load_flow_from_json

flow = load_flow_from_json("exports/Curl.json")
# Now you can use it
flow("Hey, have you heard of Langflow?")