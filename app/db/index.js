// 1 import package mongos
const mongoose = require('mongoose');

// 2 kita import konfigurasi dari file config.js
const config = require('../config');

// 3 buat koneksi ke mongo db menggunakan konfigurasi yang telah kita import
mongoose.connect(config.urlDb);

// 4 simpan koneksi dalam constant db
const db = mongoose.connection;

// 5 export db supaya bisa digunakan pada file lain
module.exports = db;