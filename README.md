# Policy Dashboard

A modern dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
Supports dark/light mode, authentication, and robust UI/UX patterns.

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or newer recommended)
- **npm** or **yarn**
- (Optional) **Cypress** for end-to-end testing

---

### Installation

```bash
npm install
# or
yarn install
```

---

### Running the App

```bash
npm run dev
# or
yarn dev
```

The app will typically be available at [http://localhost:5173](http://localhost:5173).

---

### Environment Variables

If required, copy `.env.example` to `.env` and update any necessary variables (such as API endpoints).

---

## Running Tests

### Unit/Integration Tests

```bash
npm test
# or
yarn test
```

### Cypress End-to-End Tests

**Open Cypress UI:**
```bash
npx cypress open
```

**Run Cypress in headless mode:**
```bash
npx cypress run
```

---

## Features

- **Dark/Light Mode:** Toggle using the sidebar button. Theme is persisted in `localStorage`.
- **Authentication:** Checks authentication on load via `/auth/me`.
- **API:** Ensure your backend (e.g., at `localhost:3001`) is running for full functionality.
- **Responsive Design:** Works on desktop and mobile.
- **Skeleton Loaders:** For improved loading UX.

---

## Project Structure

- `src/components/` – React components (UI, layout, etc.)
- `src/hooks/` – Custom React hooks
- `src/provider/` – Context providers (e.g., Auth, Theme)
- `src/context/` – React context definitions
- `src/assets/` – Static assets (images, logos)
- `src/types/` – TypeScript types and interfaces

---

## Troubleshooting

- If you see errors about missing dependencies, run `npm install` or `yarn install`.
- If the UI does not update for dark mode, ensure you are using the latest Tailwind CSS and your custom variant is set in `index.css`.

---

For further questions, check the code comments or contact the project maintainer.
