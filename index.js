const express = require("express")
const path = require('path')
const fileUpload = require('express-fileupload');
const homelessRouter = require('./tsc/router/homeless-router');
const orgRouter = require('./tsc/router/org-router');
const orgServiceRouter = require('./tsc/router/service-router');
const fileUploadRouter = require('./tsc/router/file-upload-router');

var cors = express('cors')


require('dotenv').config();

const app = express()

const BOND_PORT = 8080

app.use(cors)

app.all('*', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*')

    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Content-Type', 'application/json;charset=utf-8')
    req.next()
})

app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload());

app.use(homelessRouter)
app.use(orgRouter)
app.use(orgServiceRouter)

app.use(fileUploadRouter)



app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(BOND_PORT, (error) => {
    console.log(`Listening on ` + BOND_PORT)
})


