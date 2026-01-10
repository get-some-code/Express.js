const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to Airbnb</h1>
            <a href="/add-home">Add Home</a>
        `);
});

app.get("/add-home", (req, res) => {
    res.send(`<h1>Register your home here</h1>
            <form action="/add-home" method="POST">
                <input type="text" name="houseName" placeholder="Enter your house name" />
                <input type="submit" />
            </form>
        `);
});

app.post("/add-home", (req, res) => {
    res.send(`<h1>${req.body.houseName} registered successfully!</h1>
            <a href="/">Go to Home Page</a>
        `);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});