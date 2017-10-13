const express = require("express");
const app = express();
const server = require("http").createServer(app);

const port = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send("ik werk");
})

server.listen(port);