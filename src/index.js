const express = require('express');

const app = express();


// app.method(path, handler);
// app.use("/", (req, res, next) => { //Bisa jadi Middleware dan Bersifat General
//     res.send("Hello Tot");
// });

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