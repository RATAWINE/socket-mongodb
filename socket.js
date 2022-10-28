const {message} = require('./script')
const express = require("express")
const axios = require("axios")
const multer = require("multer")
const app = express()







//RESTAURANTS CLOUDINARY FOLDER




exports.main = function(io){

io.on('connection', (socket) => {
    console.log('a user connected');
    message(io,socket)
    socket.on('fav', async (msg) => {
        console.log(msg)
     
        if(msg){
            console.log("Favourites...")
          
                // await Fav.create({
                //     dishId: "123456789",
                //     name: "name"
                // })
              const {dishId,name} = msg

            const fav = new Fav({dishId, name});
           await fav.save();
           const allFavs = await Fav.find();
           socket.emit("data", allFavs)

        }
      });
     
     
   
     
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}