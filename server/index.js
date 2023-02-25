//create nodejs express server
const http = require('http')
const express = require('express');
const app = express();
const cors = require('cors')

// 127.0.0.1 is the loopback address
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

// Allows client VueJS to access server API
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/', (req, res) => {
    res.send({ title: "ExerciseMania", message: "Welcome to ExerciseMania!" })
})

app.get('/login', (req, res) => {
    res.render('login', {})
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})