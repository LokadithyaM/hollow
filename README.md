# SmartRetail.AI — AI-Driven E-Commerce Search and Decision Engine

SmartRetail.AI is an intelligent, open-ended e-commerce platform that augments product discovery using web scraping, LLMs, and real-time data fusion. It enables users to search for products using natural language, processes product metadata, reviews, and pricing from the web, and helps users make informed purchase decisions via AI-powered comparative analysis.

## 🔠 Features

* 🔍 **Natural Language Search:** Users can type open-ended queries (e.g., *"Best laptops for coding under \$1000"*). These are tokenized and converted into key keywords using **Gemini**.
* 🛒 **Product Scraping:** Relevant product listings and metadata are fetched using **SerpAPI**'s product data scraping.
* 📊 **Data Analysis:** Reviews, average ratings, and price distributions are extracted and processed.
* 🤖 **AI-Powered Decision Assistant:** A second Gemini agent (with context-fed instructions) answers follow-up questions, summarizes insights, and provides comparative evaluations of products.
* ⚡ **Real-Time Backend:** Fast and reactive UI backed by **Next.js**, **MongoDB**, and **Redis**.

## 🧰 Tech Stack

| Technology  | Description                                      |
| ----------- | ------------------------------------------------ |
| **Next.js** | Fullstack framework for React with SSR/ISR       |
| **MongoDB** | Document database to store product, review data  |
| **Redis**   | Caching layer for performance and state tracking |
| **SerpAPI** | Web scraping engine to fetch live product data   |
| **Gemini**  | LLM used for query understanding + smart replies |

## 🚀 Architecture Overview

```plaintext
User Prompt
    ↓
Gemini (Prompt → Search Keywords)
    ↓
SerpAPI (Web Scraping Products)
    ↓
Store Data in MongoDB + Redis
    ↓
Gemini (Product + Review Context → Intelligent Responses)
    ↓
Display Final Recommendations
```


## 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/smartretail-ai.git
cd smartretail-ai

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Add your SerpAPI key, Gemini credentials, DB URIs etc.

# 4. Run the development server
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file with the following:

```env
SERPAPI_KEY=your_key_here
GEMINI_API_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
```

## 📌 TODO

* [ ] Product bookmarking and comparison
* [ ] Advanced filtering on reviews (e.g., sentiment, keywords)
* [ ] User accounts and history
* [ ] Mobile optimization
* [ ] Deployment (Vercel/Docker)

## 🤝 Contributing

Pull requests are welcome. Please open an issue first for feature discussions or bugs.

## 📄 License

MIT License

---

### ⚠️ Disclaimer

This project uses real-time scraping via SerpAPI and AI generation via Gemini. Ensure compliance with respective TOS if deploying commercially.
