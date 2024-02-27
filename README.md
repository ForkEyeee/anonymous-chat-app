---

# Anonymous Chat App

## Overview

Real-time anonymous chat application built with Next.js & Socket.IO, featuring real-time messaging without user registration.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- npm or yarn

## Installation

1. **Clone the repository**

   Use Git to clone the project to your local machine:

   ```bash
   git clone https://github.com/jbrown58/anonymous-chat-app
   ```

2. **Install dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root of your project and fill it with the necessary environment variables:

   ```plaintext
   REDIS_USER=""
   REDIS_PW=""
   REDIS_HOST=""
   REDIS_PORT=""
   ```

   Replace the placeholders with your actual configuration values. These include Redis credentials, Socket.IO server URL, frontend URL, and NextAuth configuration.

4. **Run the development server**

   Start the local development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Edit and Preview**

   You can start editing the page by modifying `app/`. The pages auto-update as you edit the files.

6. **Testing (Optional)**

   Run the tests using Cypress:

   ```bash
   npx cypress open
   # or
   yarn cypress:open
   ```

## Dependencies

- [Next.js](https://nextjs.org/)
- [Socket.IO](https://socket.io/)
- [Redis](https://redis.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cypress](https://www.cypress.io/)

## Deploy on Vercel

Deploy your Next.js app easily using the [Vercel Platform](https://vercel.com/new). Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---