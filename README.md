<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

# 📝 NoteHub

A modern, full-stack multi-user note management ecosystem built with **Next.js**. The application delivers a high-performance user experience by seamlessly combining secure authentication with advanced server-state synchronization.

🔗 **Live Demo:** [09-auth-indol-sigma-77.vercel.app](https://09-auth-indol-sigma-77.vercel.app/)

---

## ⚡ Key Features

* **🔐 Secure Auth & Protected Routes:** Full onboarding flow (signup, login, logout) with session persistence. Client-side route guards isolate and shield individual user dashboards.
* **🔄 Advanced Server-State (React Query):** Replaced heavy, boilerplate global state with declarative caching, background data prefetching, and automatic cache invalidation.
* **🚀 Optimistic UI Updates:** Instant user interface responses for all note CRUD operations (create, edit, delete) with a resilient automatic rollback mechanism on server errors.
* **📦 Smart Pagination:** Smooth page-by-page data fetching paired with background prefetching to completely eliminate layout-blocking loading indicators.
* **🎨 Modern Responsive UI:** A clean, accessible, mobile-first interface crafted with Tailwind CSS.

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="40" height="40" alt="Next.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="40" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="40" height="40" alt="TailwindCSS" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" />
</p>

* **Framework:** Next.js & React
* **State Management & Fetching:** TanStack Query (React Query), Axios, React Context API
* **Styling:** Tailwind CSS
* **Deployment:** Vercel (CI/CD)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/anastacia-tkachova/NoteHub.git
cd NoteHub
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
```
### Open http://localhost:3000 with your browser to see the result.
