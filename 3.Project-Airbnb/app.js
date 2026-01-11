// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');

const app = express();

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res) => {
    res.status(404).render('404', {pageTitle: '404 Page Not Found'});
})

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});