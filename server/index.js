//create nodejs express server
const http = require('http')
const express = require('express');
const app =  express();

// 127.0.0.1 is the loopback address
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title:"ExerciseMania", message:"Welcome to ExerciseMania!"})
})

app.get('/login', (req, res) => {
    res.render('login', {title:"ExerciseMania", message:"Welcome to ExerciseMania!"})
})

app.listen(port, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})