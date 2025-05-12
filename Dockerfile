FROM python:3.11-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src/

WORKDIR /app
RUN apt-get update && apt-get install -y \
    git gcc curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

COPY pyproject.toml /app/
COPY .env /app/.env
COPY src /app/src
WORKDIR /app
RUN poetry install --no-root

COPY frontend /app/frontend
WORKDIR /app/frontend
RUN npm install

EXPOSE 8000
EXPOSE 3000

CMD bash -c "\
  uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload & \
  cd /app/frontend && npm run dev & \
  wait -n"
