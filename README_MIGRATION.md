# Руководство по миграции Stork Hotel (Без сборщика)

## Обзор
Проект мигрирован на чистый стек: HTML + Vanilla JS + Tailwind CSS (CLI).
Никаких сложных сборщиков (Vite/Webpack). Файловая структура плоская.

## Структура
```
/
  index.html          # Главная страница
  lots/               # Раздел лотов
    index.html
    detail.html
  events/             # Раздел новостей (генерируется скриптом)
  assets/
    css/              # Стили
    js/               # Скрипты
    data/             # JSON данные
  templates/          # Шаблоны HTML
  scripts/            # Node.js скрипты (генерация страниц)
  package.json        # Зависимости (Tailwind CLI, Serve)
```

## Установка

1. **Установка зависимостей**:
   ```bash
   npm install
   ```
   *Это установит только инструменты разработки (Tailwind CLI) и локальный сервер.*

## Запуск

1. **Запуск Tailwind (CSS Watch)**:
   В отдельном терминале запустите компиляцию стилей:
   ```bash
   npm run css:watch
   ```
   *Это будет следить за изменениями в HTML/JS и обновлять `assets/css/style.css`.*

2. **Генерация страниц новостей**:
   Если вы изменили `assets/data/news.json`, пересоберите новости:
   ```bash
   node scripts/generate-pages.js
   ```

3. **Локальный сервер**:
   ```bash
   npm run dev
   ```
   Откройте ссылку в браузере (обычно http://localhost:3000).

   *Важно: Просто открыть HTML файл двойным кликом может не сработать из-за CORS политик браузера (модули JS требуют HTTP).*

## Разработка

- **CSS**: Редактируйте классы в HTML или `assets/css/main.css`. Tailwind CLI обновит `style.css`.
- **JS**: Используйте ES Modules. Библиотеки (GSAP, Leaflet) подключены через CDN.
- **HTML**: Используйте относительные пути (`assets/...`, `../assets/...`).

## Деплой

Просто скопируйте все файлы из корневой папки (кроме `node_modules`, `scripts`, `templates`) на хостинг.
Перед копированием запустите финальную сборку CSS:
```bash
npm run css:build
```
