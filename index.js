"use strict";

const   express         = require('express'),
        multer          = require('multer'),
        app             = express(),
        upload          = multer({
            dest: __dirname + '/public/uploads'
        }),
        fs              = require('fs'),
        path            = require('path'),
        Tesseract       = require('tesseract.js');

app.use(express.static('public'));
app.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file.filename);
    console.log(req.file.originalname);
    let imageFile = fs.readFileSync(__dirname + '/public/uploads/' + req.file.filename);
    Tesseract.recognize(imageFile, {lang: path.resolve(__dirname, 'lang/3.02/deu')})
        .progress(message => console.log(message))
        .then(function(result){
            console.log(result)
            res.setHeader('Content-Type', 'text/html');
            res.write('<html lang="de"><head><meta charset="utf-8"/></head><body>');
            res.write(result.html);
            res.write('</body></html>');
            res.end();
        });
});

app.listen(63000, () => {
    console.log('Ready...');
});