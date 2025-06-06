const express = require('express');
const supabase = require('@supabase/supabase-js');


const app = express();

const profileRoutes = require('./routes/profile');
const productsRoutes = require('./routes/products.js')
const usersRoutes = require('./routes/users.js')
const authRoutes = require('./routes/auth');

const middlewareLogRequest = require('./middleware/logs.js')

// app.method(path, handler);
app.use(middlewareLogRequest); //middleware
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes) //memakai semua method yang ada di route /users
app.use('/products', productsRoutes) //memakai semua method yang ada di routes /products

app.use('/profile', profileRoutes);

app.listen(4000, ()=> {
    console.log('Server Berhasil Dijalankan');
})