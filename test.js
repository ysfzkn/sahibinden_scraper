
const express = require('express')
const app = express()
const port = 3000
const child = require("child_process");
const path = require("path")

app.get('/v1/spawn/sahibinden', (req, res) =>
{
    var process = child.spawn('python', [path.join(__dirname,"../Scripts/sahibinden.py")]);

    process.stdout.on('data',  (data) =>
    {
        res.send(data.toString());
    })

    process.stderr.on('data',  (data) =>
    {
        console.log(data.toString())
    });

    process.on('exit',  (data) =>
    {
        console.log(data.toString())
    });
})

app.listen(port, () =>
{
    console.log(`http://localhost:${port}`)
})