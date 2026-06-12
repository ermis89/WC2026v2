# WC2026 Hub v2

A modern, maintainable React web application for an unofficial FIFA World Cup 2026 companion experience.

The goal of this repository is to replace the previous single-file HTML implementation with a cleaner application structure that is easier to maintain, extend and deploy.

## Current scope

The first version includes:

- Vite + React application scaffold
- Responsive dark/light UI
- Overview dashboard
- Match schedule cards
- Team search and team cards
- Stadium cards
- Initial sample datasets for teams, matches and venues
- ESLint setup
- GitHub Pages deployment workflow

## Project structure

```text
.
├─ index.html
├─ package.json
├─ eslint.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles.css
│  └─ data/
│     ├─ teams.js
│     ├─ matches.js
│     └─ stadiums.js
└─ .github/
   └─ workflows/
      └─ deploy.yml
```

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

On every push to `main`, the workflow:

1. installs dependencies,
2. runs ESLint,
3. builds the Vite app,
4. deploys the `dist` folder to GitHub Pages.

GitHub Pages must be configured to use **GitHub Actions** as the source.

## Next development steps

Recommended next iterations:

1. Import the full 48-team dataset.
2. Import the full 104-match schedule.
3. Add group standings calculation.
4. Add knockout bracket view.
5. Add favorites and prediction persistence via `localStorage`.
6. Add validated data update scripts instead of manual edits.
7. Add richer accessibility checks and keyboard navigation.

## Disclaimer

This is an unofficial, non-commercial fan project. FIFA World Cup 2026™ and related marks belong to FIFA.
