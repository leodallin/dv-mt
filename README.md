# Monetary Transactions — React + Node/Express

A simple web app where users can submit a monetary transaction (amount + description).
Front-end in React, back-end in Node.js/Express, using in-memory storage.

---

## Tech Stack
- Front-end: React (Vite)
- Back-end: Node.js + Express
- Storage: In-memory array (no DB)

## Branches
- `main`: code delivered within the original 30-minute window.
- `post-challenge-updates`: small improvements + working backend.

---

## Prerequisites
- Node.js 18+ and npm

## Project Structure
```
/front        # React app
/back         # Node/Express server
```

---

## Setup

Install dependencies in each folder:

```bash
cd front
npm install

cd ../back
npm install
```

---

## Running Locally

Open **two terminals** (one for front, one for back):

**Front-end**
```bash
cd front
npm run dev
```

**Back-end**
```bash
cd back
node server.js
```
