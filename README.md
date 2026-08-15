# Bloglist App

This project is part of the [Full Stack Open Next.js](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs) course.

## Tech Stack

* **Framework:** Next.js (v16.3)
* **Styling:** Tailwind CSS (v4)
* **Database & ORM:** Neon PostgreSQL (Serverless), Drizzle ORM
* **Authentication:** NextAuth.js (v5 beta)

## Run Locally

Install dependencies:

```bash
npm install
```

Create a file named `.env.local` in your repository with the following environment variables:

```env
DATABASE_URL=your_neon_test_database_URL
AUTH_SECRET=any_random_character_sequence
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the application.

## 🌐 Live Demo

https://bloglist-app-one.vercel.app/
