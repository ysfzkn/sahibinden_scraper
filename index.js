
const express = require('express')
const app = express()
const port = 3000
const child = require("child_process");
const path = require("path")
const util = require("util")
const axios = require("axios")

const exec = util.promisify(child.exec);

app.get('/v1/spawn/sahibinden' ,async (req, res) =>
{
    const { stdout, stderr } = await exec(`python ${path.join(__dirname,'./sahibinden.py')}`)

        if(stderr) {
            return res.send({error:stderr.toString()})
        }

        res.send({stdout:stdout})
})

app.get('/', async (req, res) =>
{
    res.status(200).send({message:'tamam'})   
})

app.get('/auth', async (req, res) =>
{   
    const sessionId = req.query.sessionId

    if(!sessionId) {
      return  res.status(422).send({message:'sessionId gerekli.'})
    }

    const response = await axios.get('http://api.app-platform.rgmbeta.com/api/v1/auth/getSessionInfo',{
        params:{
            sessionId:sessionId,
            appName:'ebrutezel/sahibinden-scrapper',
            secretKey:'ca139f7a53fc441189639251ac3688d9'
        }
    })

    if(!response.data.data) {
        return res.status(403).send({message:'yetkilendirme başarısız'})
    }

    res.redirect('/')
})

app.listen(port, () =>
{
    console.log(`http://localhost:${port}`)
})