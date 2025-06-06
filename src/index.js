const express = require('express');
const supabase = require('@supabase/supabase-js');

const app = express();

const usersRoutes = require('./routes/users.js')
const middlewareLogRequest = require('./middleware/logs.js')

// app.method(path, handler);
app.use(middlewareLogRequest); //middleware
app.use(express.json());

app.use('/users', usersRoutes) //memakai semua method yang ada di route /users


app.listen(4000, ()=> {
    console.log('Server Berhasil Dijalankan');
})