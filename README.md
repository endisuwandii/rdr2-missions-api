# RDR2 Missions Backend REST API

## 📋 Endpoint Table - Missions API

| Method | Endpoint        | Description                                 | Status ✅/❌ |
| ------ | --------------- | ------------------------------------------- | ------------ |
| GET    | `/`             | Displays a welcome message                  | ✅           |
| GET    | `/missions`     | Retrieves all mission data                  | ✅           |
| GET    | `/missions/:id` | Retrieves mission details by ID             | ✅           |
| POST   | `/missions`     | Adds a new mission                          | ✅           |
| DELETE | `/missions/:id` | Deletes a mission by ID                     | ✅           |
| PATCH  | `/missions/:id` | _Not available yet - partially update data_ | ❌           |
| PUT    | `/missions/:id` | _Not available yet - fully update data_     | ❌           |
| DELETE | `/missions`     | _Not available yet - delete all missions_   | ❌           |

## 🚀 Base URL

###### http://localhost:3000

# 🎮 RDR2 Missions API

Welcome to the **RDR2 Missions API**!  
This is a simple REST API built with [Hono](https://hono.dev) and [Bun](https://bun.sh) to serve mission data from the popular game _Red Dead Redemption 2_.

The project was created as part of backend learning to demonstrate the basic principles of APIs, routing, and data handling.

---

## ✨ Features

- **RESTful API** → Uses standard HTTP methods (GET) to access mission data.
- **Mock Data** → Provides data from a JavaScript array (no database required).
- **Fast & Lightweight** → Powered by Hono (minimalist web framework) and Bun (modern JavaScript runtime).

---

## 📦 Requirements

- [Bun](https://bun.sh) installed on your computer.

---

## 🚀 Getting Started

To install dependencies:

- bun install

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rdr2-missions-api.git
cd rdr2-missions-api
```
