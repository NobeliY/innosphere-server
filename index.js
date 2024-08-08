require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const https = require('https')
const fs = require('fs')
var log4js = require('log4js');
log4js.configure({
    appenders: [{type: 'console'},
                {type: 'file', filename: 'express.log', category: 'dev'}]
});

var logger = log4js.getLogger('dev');
logger.setLevel('DEBUG');

const PORT = process.env.PORT || 5000

//const options = {}
// for linux
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/server.innosfera-almet.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/server.innosfera-almet.ru/cert.pem')
}


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(log4js.connectLogger(logger, {level: log4js.levels.DEBUG}));
app.use('/api', router)

// for linux
const server = https.createServer(options, app)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // not for linux
        // app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

        // for linux
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
