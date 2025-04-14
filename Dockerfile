FROM python:3.11-slim-bullseye

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src

RUN apt-get update && apt-get install -y \
    git gcc && \
    rm -rf /var/lib/apt/lists/*

COPY pyproject.toml /app/

RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-root

WORKDIR /app
RUN git init && \
    git remote add origin https://github.com/SDSU-CompE-561-Spring-2025/sport-arena-event-booking.git 
RUN mkdir -p /app/src/app/core && \
    mkdir -p /app/src/app/models && \
    mkdir -p /app/src/app/routes && \
    mkdir -p /app/src/app/schemas && \
    mkdir -p /app/src/app/services && \
    touch /app/src/app/core/__init__.py && \
    touch /app/src/app/models/__init__.py && \
    touch /app/src/app/routes/__init__.py && \
    touch /app/src/app/schemas/__init__.py && \
    touch /app/src/app/services/__init__.py && \
    echo "__version__ = '0.1.0'" > /app/src/app/__about__.py && \
    touch /app/src/app/__init__.py && \
    echo "from fastapi import FastAPI\n\
\n\
app = FastAPI()\n\
\n\
@app.get('/')\n\
def read_root():\n\
    return {'message': 'Hello from Docker (fallback main)'}" > /app/src/app/main.py && \
    touch /app/src/app/__init__.py

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]