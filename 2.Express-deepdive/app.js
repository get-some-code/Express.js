// External module
const express = require('express');

// Create express app
const app = express();

// GET request → Home page
app.get('/', (req, res) => {
    console.log("GET /", req.method);
    res.send("<p>Welcome to Express JS</p>");
});

app.get('/submit', (req, res) => {
    res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="username" placeholder="Enter name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
    res.send("Form submitted successfully");
});

// GET request → Contact page
app.get('/contact', (req, res) => {
    console.log("GET /contact", req.method);
    res.send("<p>Contact Us</p>");
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});