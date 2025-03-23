FROM mcr.microsoft.com/playwright:v1.51.1

WORKDIR /app

# Копіюємо package.json і встановлюємо залежності
COPY playwright/package.json playwright/package-lock.json ./
RUN npm install

# Копіюємо конфігурацію та тести
COPY playwright/playwright.config.ts ./
COPY playwright/tests ./tests/

# Команда за замовчуванням (може бути перевизначена в docker-compose)
CMD ["npx", "playwright", "test"]