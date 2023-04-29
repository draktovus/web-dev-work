require('dotenv').config()

const http = require('http')
const path = require('path')
const express = require('express');
const users = require('./controllers/users')
const workouts = require('./controllers/workouts')
const biometrics = require('./controllers/biometrics')
const { requireLogin, parseAuthorizationHeader } = require('./middleware/authorization')
const app = express();


// 127.0.0.1 is the loopback address
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Creates a middleware for json.
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        next()
    })
    .use(parseAuthorizationHeader())

// Actions
app
    .get('/api/v1/', (req, res) => {
        res.send("Hello, this is exercise maniac!")
    })
    .use('/api/v1/workouts', requireLogin(true), workouts)
    .use('/api/v1/biometrics', requireLogin(true), biometrics)
    .use('/api/v1/users', users)

// Catch all (called deep linking)
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

//error handling
app
    .use((err, req, res, next) => {
        console.log(err)
        const msg = {
            status: err.code || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})