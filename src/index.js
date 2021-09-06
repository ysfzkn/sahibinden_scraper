
const express = require("express");
const app = express()
const port = 3000
const child = require("child_process");
const path = require("path")
const util = require("util")
const axios = require("axios")

const exec = util.promisify(child.exec);
app.use("../public",express.static(path.join(__dirname,'../public')))


// function checkSession(req, res)
// {
//     if(req.session.sessionId)
//     {
//        next();     
//     } 
//     else 
//     {
//        return res.redirect("/noauth"); 
//     }
// }



// app.get('/auth', async (req, res) =>
// {   
//     const sessionId = req.query.sessionId

//     if(!sessionId)
//     {
//     return  res.status(422).send(`<h3 align="center">Session id gerekli !</h3>`)
//     }

//     const response = await axios.get('http://api.app-platform.rgmbeta.com/api/v1/auth/getSessionInfo',
//     {
//         params:
//         {
//             sessionId:sessionId,
//             appName:'ebrutezel/sahibinden-scrapper',
//             secretKey:'ca139f7a53fc441189639251ac3688d9'
//         }
//     })

//     if(!response.data.data) 
//     {
//         res.redirect('/noauth')
//     }
//     else
//     {
//         req.session.sessionId = sessionId;
//         res.redirect("/");
//     }
// });

// app.get('/noauth', function(req, res) 
// {
//     console.log('Yetkilendirme Başarısız !');
//     res.status(403).send(`<h3 align="center">Yetkilendirme başarısız !</h3>`)
// });


app.use('/', async (req, res) => // main page
{
    res.sendFile(path.join(__dirname+'/template/form.html'));
})

app.get('/v1/spawn/sahibinden/:brand/:model' , async (req, res) =>
{
    //var parameters = req.params ; // json object

    // var brand = parameters.brand;
    // var model = parameters.model;
    var brand = "toyota";
    var model = "corolla";
    console.log(brand);
    const { stdout, stderr } = await exec(`python ${path.join(__dirname,'/script/sahibinden.py')} ${brand} ${model}`);

    if(stderr) 
    {
        return res.send({error:stderr.toString()})
    }
    
    const awat = await JSON.parse(stdout); 
    console.log(awat);
    res.send({stdout: awat})   // handling by test.js 
})


app.listen(port, () =>
{
    console.log(`http://localhost:${port}`)
})