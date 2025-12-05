# Frontend - Auto-Generated Blog

React frontend for the auto-generated blog application.

## Features

- Modern React 18 with Vite
- React Router for navigation
- Responsive design
- Article list and detail views
- Loading states and error handling
- Nginx for production serving

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Docker

### Build Image

```bash
docker build -t auto-blog-frontend .
```

### Run Container

```bash
docker run -p 3000:80 auto-blog-frontend
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.js          # API client
│   ├── components/
│   │   ├── Header.jsx         # Header component
│   │   ├── Header.css
│   │   ├── ArticleCard.jsx    # Article card component
│   │   └── ArticleCard.css
│   ├── pages/
│   │   ├── HomePage.jsx       # Home page
│   │   ├── HomePage.css
│   │   ├── ArticlePage.jsx    # Article detail page
│   │   └── ArticlePage.css
│   ├── App.jsx                # Main app component
│   ├── App.css
│   └── main.jsx               # Entry point
├── public/
├── index.html
├── vite.config.js
├── package.json
├── Dockerfile
└── nginx.conf
```

## Environment Variables

Create `.env` file if needed:

```env
VITE_API_URL=/api
```

## Routes

- `/` - Home page with article list
- `/article/:id` - Article detail page
