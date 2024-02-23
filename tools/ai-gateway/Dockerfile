FROM python:3.10-slim

# Install git
RUN apt-get update && apt-get install -y git

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/AI-Northstar-Tech/openai-proxy.git .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["waitress-serve", "--port=5000", "wsgi:app"]
