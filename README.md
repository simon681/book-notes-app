# 📚 Book Notes App

A personal book tracking web app inspired by [Derek Sivers](https://sive.rs/book). This app lets you record books you've read along with your own notes, ratings, and reading dates. It displays Open Library book covers and supports sorting by rating, title, and recency.

---

## 🚀 Features

- ✅ Add, view, and delete book notes (CRUD)
- 📊 Sort books by rating, title, or date read
- 🖼 Display cover images from the Open Library Covers API
- 🧠 Store reviews, ratings, and personal insights
- 🗃️ PostgreSQL-backed data persistence
- 🎨 Clean layout with EJS templating and responsive CSS

---

## 🔧 Technologies Used

- **Node.js + Express** for the backend
- **PostgreSQL** for the database
- **EJS** for rendering templates
- **Open Library Covers API** for fetching book cover images
- **dotenv** to secure database credentials
- **Bootstrap / CSS** for styling (you can customize)

---

## 📂 Project Structure

```
project-root/
│
├── index.js                # Main server file
├── db.js                   # Database connection logic
├── .env                    # Environment variables (not tracked in Git)
├── package.json
├── /views
│   ├── index.ejs
│   ├── add.ejs
│   └── /partials
│       ├── header.ejs
│       └── footer.ejs
├── /public
│   └── /css
│       └── main.css
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/simmon681/book-notes-app.git
cd book-notes-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create PostgreSQL database

In `psql`:
```sql
CREATE DATABASE booknotes;

\c booknotes

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INTEGER,
  date_read DATE,
  review TEXT,
  cover_id TEXT
);
```

### 4. Configure environment variables

Create a `.env` file:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=booknotes
DB_PASSWORD=your_password_here
DB_PORT=5432
```

### 5. Run the server
```bash
nodemon index.js
```

Visit `http://localhost:3000` in your browser.

---

## 📷 Screenshot

*(Add a screenshot of your app here once complete)*

---

## 📡 API Source

Cover images are fetched using the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers):
```html
<img src="https://covers.openlibrary.org/b/id/[cover_id]-L.jpg" />
```

---

## 🙏 Credits

Built by [Murshidul Hasan](https://murshidul.com), inspired by [Derek Sivers](https://sive.rs/book).  
Capstone project from [Angela Yu's Web Development Course](https://www.udemy.com/course/the-complete-web-development-bootcamp/).

---

## 📣 License

MIT License – free to use and modify.
