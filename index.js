const db = require('mongoose')
const config = require('config')
const express = require('express')
const app = express()

const PORT = config.get('PORT') || 5000
const URL_MONGODB = config.get('URL')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', require('./router/router'))


const RUN_SERVER = async () => {
    try{
        await db.connect(URL_MONGODB)
        app.listen(PORT, () => {
            console.log(`Server is runnign in host ${config.get('HOST')}:${config.get('PORT')}!`)
        })
    }catch(e){
        console.log(e)
    }
}

RUN_SERVER()