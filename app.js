// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session'); // ← ADD THIS

// Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const { error } = require('./controllers/Error');

const app = express();

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

// ← ADD SESSION MIDDLEWARE HERE (BEFORE ROUTES)
// ================================================
app.use(session({
    secret: 'airbnb-secret-key-2024-change-this', // Change this to something secure
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: false // Set to true in production with HTTPS
    }
}));
// ================================================

// Routes (AFTER session middleware)
app.use(userRouter);
app.use("/host", hostRouter);

app.use(error);

// Start server
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});