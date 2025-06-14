import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Utility: Generate Open Library cover image URL
function getCoverUrl(cover_id) {
  return cover_id
    ? `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`
    : "/default-cover.jpg"; // Optional fallback image in /public
}

// Route: Home - List all books with optional sorting
app.get("/", async (req, res) => {
  const sortField = req.query.sort || "id";
  const allowedSorts = ["rating", "date_read", "title", "id"];
  const safeSort = allowedSorts.includes(sortField) ? sortField : "id";

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY ${safeSort} DESC`);
    res.render("index.ejs", {
      books: result.rows,
      getCoverUrl,
    });
  } catch (err) {
    console.error("❌ Error loading books:", err);
    res.status(500).send("Error loading books from database.");
  }
});

// Route: Display add form
app.get("/add", (req, res) => {
  res.render("add.ejs");
});

// Route: Handle new book submission
app.post("/add", async (req, res) => {
  const { title, author, rating, date_read, review, cover_id } = req.body;

  try {
    await db.query(
      `INSERT INTO books (title, author, rating, date_read, review, cover_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, author, rating, date_read, review, cover_id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error adding book:", err);
    res.status(500).send("Error adding book to database.");
  }
});

// Route: Delete a book by ID
app.post("/delete/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.status(500).send("Error deleting book.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Book Notes app running at http://localhost:${port}`);
});
