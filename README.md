# Event Management System (Frontend)

## Project Overview
The **Event Management System (Frontend)** is a web application built with **React + TypeScript + Vite**.  

It allows users to explore and manage events and venues.  
- Clients can browse venues and events, and register for them.  
- Venue providers and event organizers can manage their venues and events efficiently through the system.  

The frontend interacts with a backend API to fetch, update, and display data dynamically.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite  
- **Styling:** TailwindCSS  
- **State Management / Data Fetching:** React Query  
- **Package Manager:** npm  

---

## Getting Started (Frontend)

### 1. Clone the repository
```bash
git clone https://github.com/mulham-salem/Event-Management-System.git
````

### 2. Navigate to the frontend folder

```bash
cd Event-Management-System/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

(The port may vary depending on Vite configuration)

---

## Notes

* Ensure the backend API is running and accessible for the frontend to fetch data.
* Update any environment variables (API URLs, keys) in `.env` if needed.
* The frontend uses **React Query** for data fetching and caching.
* TailwindCSS handles styling and responsive design.
* Only the frontend is included in this README; backend setup is separate.

---

## Folder Structure

```
Event-Management-System/
├── frontend/      # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```
---

