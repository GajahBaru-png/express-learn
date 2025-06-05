const express = require('express');

const app = express();

const usersRoutes = require('./routes/users.js')
const middlewareLogRequest = require('./middleware/logs.js')

// app.method(path, handler);
app.use(middlewareLogRequest); //middleware

app.use('/users', usersRoutes) //memakai semua method yang ada di route /users

app.get("/", (req, res) => {
    res.json({
        nama: "Christo",
        email: "christo@gmail.com"
    });
})

app.post("/", (req, res) => {
    res.send("Hello Post Method")
})

app.listen(4000, ()=> {
    console.log('Server Berhasil Dijalankan');
})