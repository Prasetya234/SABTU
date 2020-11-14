const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 1200;

// view engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'prasetya',
    password: '1234',
    database: 'note_book'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

//LOGIN-----
app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM login', (err, hasil) => {
        if(err) throw err;
        res.render('login.hbs',{
            judulhalaman: 'login',
            data: hasil
        });
    });
});

app.post('/', (req, res) =>{
    var EMAIL = req.body.inputEMAIL;
    var PASSWORD = req.body.inputPASSWORD;
    koneksi.query('INSERT INTO login(EMAIL, PASSWORD)values(?,?)',
    [EMAIL, PASSWORD],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

//PRAKERJA-----
app.get('/prakerja', (req, res) => {
    koneksi.query('SELECT*FROM prakerja', (err, hasil) => {
        if(err) throw err;
        res.render('prakerja.hbs',{
            judulhalaman: 'prakerja',
            data: hasil
        });
    });
});

app.post('/prakerja', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var TANGGAL_LAHIR = req.body.inputTANGGAL_LAHIR;
    var USIA = req.body.inputUSIA;
    var ALAMAT = req.body.inputALAMAT;
    var JENIS_KELAMIN = req.body.inputJENIS_KELAMIN;
    var STATUS_KERJA = req.body.inputSTATUS_KERJA;
    koneksi.query('INSERT INTO prakerja(NAMA, TANGGAL_LAHIR, USIA, ALAMAT, JENIS_KELAMIN, STATUS_KERJA)values(?,?,?,?,?,?)',
    [NAMA, TANGGAL_LAHIR, USIA, ALAMAT, JENIS_KELAMIN, STATUS_KERJA],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/prakerja');
    }
    )
});

app.get('/hapus-ID_PEKERJA/:ID_PEKERJA', (req, res) => {
    var ID_PEKERJA = req.params.ID_PEKERJA;
    koneksi.query("DELETE FROM prakerja WHERE ID_PEKERJA=?",
         [ID_PEKERJA], (err, hasil) => {
             if(err) throw err;
             res.redirect('/prakerja');
         }
    )
});

//DATA----
app.get('/data', (req, res) => {
    koneksi.query('SELECT*FROM prakerja', (err, hasil) => {
        if(err) throw err;
        res.render('data.hbs',{
            judulhalaman: 'DATA-PENDAFTAR',
            data: hasil
        });
    });
});

app.post('/data', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var TANGGAL_LAHIR = req.body.inputTANGGAL_LAHIR;
    var USIA = req.body.inputUSIA;
    var ALAMAT = req.body.inputALAMAT;
    var JENIS_KELAMIN = req.body.inputJENIS_KELAMIN;
    var STATUS_KERJA = req.body.inputSTATUS_KERJA;
    koneksi.query('INSERT INTO prakerja(NAMA, TANGGAL_LAHIR, USIA, ALAMAT, JENIS_KELAMIN, STATUS_KERJA)values(?,?,?,?,?,?)',
    [NAMA, TANGGAL_LAHIR, USIA, ALAMAT, JENIS_KELAMIN, STATUS_KERJA],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/data');
    }
    )
});

app.get('/hapus-ID_PEKERJA/:ID_PEKERJA', (req, res) => {
    var ID_PEKERJA = req.params.ID_PEKERJA;
    koneksi.query("DELETE FROM prakerja WHERE ID_PEKERJA=?",
         [ID_PEKERJA], (err, hasil) => {
             if(err) throw err;
             res.redirect('/data');
         }
    )
});
//WEBSIDE----------
app.get('/webside', (req, res) => {
    koneksi.query('SELECT*FROM webside', (err, hasil) => {
        if(err) throw err;
        res.render('webside.hbs',{
            judulhalaman: 'DATA',
            data: hasil
        });
    });
});

app.post('/webside', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    koneksi.query('INSERT INTO webside(NAMA)values(?)',
    [NAMA],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/webside');
    }
    )
});

//LOGOUT---------
app.get('/logout', (req, res) => {
    koneksi.query('SELECT*FROM login', (err, hasil) => {
        if(err) throw err;
        res.render('login.hbs',{
            judulhalaman: 'login',
            data: hasil
        });
    });
});

app.post('/logout', (req, res) =>{
    var EMAIL = req.body.inputEMAIL;
    var PASSWORD = req.body.inputPASSWORD;
    koneksi.query('INSERT INTO login(EMAIL, PASSWORD)values(?,?)',
    [EMAIL, PASSWORD],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/logout');
    }
    )
});

app.listen(port, () => {
    console.log(`app longin berjalan pada port ${port}`);
});
