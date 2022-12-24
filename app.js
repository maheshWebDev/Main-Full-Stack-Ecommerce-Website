const express = require('express');

const bodyParser = require('body-parser');


const cors = require('cors');


const db = require('./config/dbconfig');

const routes = require('./routes/productRoute')


const app = express();


// global middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

// route middleware 

app.use(routes)

// model synchronization

db.sync().then(result=>{}).catch(err=>{
    console.log(err)
})


app.listen(3000,()=>{
    console.log("server is running.....")
})
