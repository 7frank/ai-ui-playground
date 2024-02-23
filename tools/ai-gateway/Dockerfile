# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN git clone https://github.com/AI-Northstar-Tech/openai-proxy.git .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables (customize as needed)
ENV OPENAI_API_KEY=your_openai_api_key
ENV PROXY_SERVER_USER=admin_user
ENV PROXY_SERVER_PASS=admin_pass

# Command to run the application
CMD ["waitress-serve", "--port=5000", "wsgi:app"]
