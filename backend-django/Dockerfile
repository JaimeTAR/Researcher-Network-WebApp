FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose port
EXPOSE 8000

# Run server with gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "ev2.wsgi:application"]