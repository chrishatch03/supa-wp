<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deployed-project"><strong>App Deployed On Vercel</strong></a> ·
  <a href="#run-locally"><strong>Run Locally</strong></a> ·
  <a href="#supabase"><strong>Supabase Backend</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Deployment through Vercel
  - Environment variables automatically assigned to Vercel project

## Deployed Project

You can view a fully working vercel app at [supa-wp.vercel.app](https://supa-wp.vercel.app/).

## Run Locally

1. Use `cd` to change into the app's directory

> MY PROJECT FOLDER IS CALLED STARTUP, USE THE NAME OF YOUR OWN LOCAL REPOSITORY

```bash
cd startup
```

2. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

## Supabase

This project uses Supabase as a backend service for auth, database, and storage.
