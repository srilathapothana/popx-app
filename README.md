# PopX App

A pixel-perfect React implementation of the PopX mobile app UI — built as part of a frontend qualifier assignment.

🔗 **Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)  
📁 **Repository:** https://github.com/srilathapothana/popx-app

---

## Screens

| Screen | Route |
|--------|-------|
| Landing | `/` |
| Login | `/login` |
| Signup | `/signup` |
| Profile | `/profile` |

---

## Features

- **Pixel-perfect design** — matches the Adobe XD design spec exactly
- **Mobile-first UI** — 390×844px phone shell centered on desktop
- **Smooth navigation** — animated page transitions using Framer Motion
- **Form validation** — real-time inline errors on all fields
- **Password strength indicator** — live feedback as you type
- **Show/hide password** — toggle on login and signup
- **Credential validation** — login checks against registered account data
- **Loading states** — spinner on submit buttons with simulated API layer
- **Toast notifications** — success and error feedback
- **Error boundary** — graceful crash handling with recovery UI
- **404 page** — handles unknown routes
- **Auth guard** — profile page redirects to home if not logged in

---

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/popx-app.git
cd popx-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── api.js              # API abstraction layer (swap for real endpoints)
├── App.jsx             # Root component with routing
├── ErrorBoundary.jsx   # Crash protection wrapper
├── Landing.jsx         # Landing screen
├── Login.jsx           # Login screen with validation
├── Signup.jsx          # Signup screen with validation
├── Profile.jsx         # Profile / account settings screen
├── NotFound.jsx        # 404 page
├── PageTransition.jsx  # Framer Motion page wrapper
├── UserContext.jsx     # Global auth state (React Context)
├── useToast.jsx        # Toast notification hook
└── index.css           # Global styles and design tokens
```

---

## Design Reference

[Adobe XD Design Link](https://xd.adobe.com/view/b68eea25-003d-4a5d-8fdd-d463eeb20b32-e3dd)

---

## Deployment

Deployed on **Vercel** — auto-deploys on every push to `main`.
