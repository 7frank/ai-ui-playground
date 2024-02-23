FROM python:3.10-slim

# Install git
RUN apt-get update && apt-get install -y git

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/AI-Northstar-Tech/openai-proxy.git .
RUN sed -i 's/psycopg2/psycopg2-binary/' requirements.txt && \
    python3 -m venv /path/to/new/virtual/environment   


# CMD ["bash"]

RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["waitress-serve", "--port=5000", "wsgi:app"]
