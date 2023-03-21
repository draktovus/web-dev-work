//create nodejs express server
const http = require('http')
const express = require('express');
const app = express();

// 127.0.0.1 is the loopback address
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Actions
app
    .get('/', (req, res) => {
        res.send("Exercise Mania")
    })

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})