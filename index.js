import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());

const EMAIL = "muskan2158.be23@chitkara.edu.in";

/* -------- Utility Functions -------- */

const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) throw new Error("Invalid fibonacci input");
  const res = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++)
    if (num % i === 0) return false;
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

/* -------- Routes -------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key required"
      });
    }

    const key = keys[0];
    const value = req.body[key];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value)) throw new Error("Prime expects array");
        data = value.filter(isPrime);
        break;

      case "lcm":
        if (!Array.isArray(value) || value.length === 0)
          throw new Error("LCM expects array");
        data = value.reduce((a, b) => lcm(a, b));
        break;

      case "hcf":
        if (!Array.isArray(value) || value.length === 0)
          throw new Error("HCF expects array");
        data = value.reduce((a, b) => gcd(a, b));
        break;

      case "AI":
        if (typeof value !== "string") {
          throw new Error("Input must be a string");
        }

        const trimmed = value.trim();
        if (trimmed.length === 0) {
          throw new Error("Question must not be empty");
        }
        if (trimmed.length > 500) {
          throw new Error("Question exceeds maximum allowed length");
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
          throw new Error("Groq API key is not configured");
        }

        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "Answer in a single word or very short phrase only."
              },
              { role: "user", content: trimmed }
            ],
            max_tokens: 50
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            timeout: 15000
          }
        );

        data = response.data?.choices?.[0]?.message?.content
          ?.trim()
          ?.split(/\s+/)[0] || "Unknown";

        break;


      default:
        return res.status(400).json({
          is_success: false,
          error: "Invalid key"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (err) {
    res.status(422).json({
      is_success: false,
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
