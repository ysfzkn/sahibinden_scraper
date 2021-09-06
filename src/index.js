
const express = require("express");
const app = express()
const port = 3000
const child = require("child_process");
const path = require("path")
const util = require("util")
const axios = require("axios")

const exec = util.promisify(child.exec);
app.use("/public",express.static(path.join(__dirname,'../public')));


app.get('/', async (req, res) => // main page
{
    res.sendFile(path.join(__dirname+'/template/form.html'));
});

app.get('/v1/spawn/sahibinden/:brand/:model' , async (req, res) =>
{
    var parameters = req.params ; // json object

    var brand = parameters.brand;
    var model = parameters.model;
    
    const { stdout, stderr } = await exec(`python ${path.join(__dirname,'/script/sahibinden.py')} ${brand} ${model}`);

    if(stderr) 
    {
        return res.send({error:stderr.toString()})
    }
    
    const awat = await JSON.parse(stdout); 
    console.log(awat);
    res.send({stdout: awat})   // handling by test.js 
});


app.listen(port, () =>
{
    console.log(`http://localhost:${port}`)
});