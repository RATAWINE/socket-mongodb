const express = require('express');
const app = express();
const mongoose = require("mongoose")
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors")
const bodyParser = require("body-parser")
const dishRoute = require('./routes')


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const Fav = require('./model')
const {main} = require('./socket')

const databaseConnect = () => {
    mongoose.connect("",{
         useNewUrlParser : true,
         useUnifiedTopology : true
    }).then(()=>{
         console.log('Database Connected')
    }).catch(error=>{
         console.log("Database failed to connect, check your internet connection")
    })
}
app.use(cors({
  orign: "*",
  methods: ["GET", "POST", "DELETE","PATCH"]
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(dishRoute)
main(io)
databaseConnect()

server.listen(4000, () => {
 
  console.log('listening on *:3000');
});

