// Core Module
const path = require('path');

// External Module
const express = require('express');

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
app.use(userRouter);
app.use("/host", hostRouter);

app.use(error);

// Start server
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});