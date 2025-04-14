# Use official Python image
FROM python:3.9-slim

# Set working directory inside the container
WORKDIR /app

# Copy the local code to the container
COPY . .

# Install required packages
RUN pip install -r requirements.txt

# Run the app
CMD ["python", "app.py"]
