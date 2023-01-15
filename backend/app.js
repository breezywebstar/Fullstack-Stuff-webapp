const express = require('express');

const mongoose = require('mongoose');

const app = express();

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');

const path = require('path');


//connect mongo db
mongoose.connect('mongodb://breezy:breezy@cluster0-shard-00-00.vapq8.mongodb.net:27017,cluster0-shard-00-01.vapq8.mongodb.net:27017,cluster0-shard-00-02.vapq8.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() =>{
    console.log("connected to mongodb" )
})
  .catch((error)=>{
      console.log(error);
  });
//middleware to solve cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff',stuffRoutes);

app.use('/api/auth',userRoutes);

module.exports = app;