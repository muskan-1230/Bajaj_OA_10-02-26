# BFHL API – Chitkara University Online Assessment

This project is developed as part of the **Qualifier-1 Online Assessment** for  
**Chitkara University (2026 | Class of 2027)**.

It implements two public REST APIs with strict response structure, validation,
error handling, and external AI integration as required in the assessment.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- REST APIs
- External AI API (LLM-based)
- dotenv (for environment variables)

---

## 📌 API Endpoints

### GET `/health`

Health check endpoint.

#### Response
```json
{
  "is_success": true,
  "official_email": "muskan2158.be23@chitkara.edu.in"
}
```
### POST `/bfhl`

Accepts **exactly one key per request**.

#### Supported Keys

| Key        | Input Type        | Output Description        |
|------------|------------------|---------------------------|
| fibonacci  | Integer           | Fibonacci series          |
| prime      | Integer Array     | Prime numbers from array |
| lcm        | Integer Array     | Least Common Multiple    |
| hcf        | Integer Array     | Highest Common Factor    |
| AI         | String            | Single-word AI response  |
---
## 📥 Request Examples

### Fibonacci
```json
{
  "fibonacci": 7
}
```

### Prime 
``` json
{
  "prime": [2, 4, 7, 9, 11]
}
```

### LCM 
``` json
{
  "lcm": [12, 18, 24]
}
```

### HCF
``` json
{
  "hcf": [24, 36, 60]
}
```

### AI
``` json
{
  "AI": "What is the capital city of Maharashtra?"
}
```

### Success Response Format
``` json
{
  "is_success": true,
  "official_email": "muskan2158.be23@chitkara.edu.in",
  "data": "..."
}
```
### Error Response Format
``` json
{
  "is_success": false,
  "error": "Error message"
}
```
Appropriate HTTP status codes are returned for invalid requests.
---
## 🔐 Environment Variables

Create a .env file in the root directory:
``` json
AI_API_KEY=your_api_key_here
```

.env is ignored using .gitignore and is never committed to version control.
---
## ▶️ Run Locally
``` json
npm install
npm start
```
Server runs at:
``` json
http://localhost:3000
```
---
## 📂 Project Structure

``` json
├── index.js
├── package.json
├── .gitignore
└── README.md
```
---
## ✅ Key Features

- Strict API structure
- Robust input validation
- Graceful error handling
- External AI integration
- Secure handling of secrets
- Public APIs

---

## 👤 Author

**Muskan**  
B.Tech CSE – Chitkara University  
Email: muskan2158.be23@chitkara.edu.in
