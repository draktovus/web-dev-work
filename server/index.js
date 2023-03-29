//create nodejs express server
const http = require('http')
const path = require('path')
const express = require('express');
const app = express();
const users = require('./controllers/users')
const workouts = require('./controllers/workouts')

// 127.0.0.1 is the loopback address
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Creates a middleware for json.
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        next()
    })

// Actions
app
    .get('/', (req, res) => {
        res.send("Exercise Mania")
    })
    .use('/api/v1/users', users)
    .use('/api/v1/workouts', workouts)

// Catch all (called deep linking)
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})