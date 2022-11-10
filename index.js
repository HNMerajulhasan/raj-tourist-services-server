const express=require('express');
const app=express();
const cors=require('cors')
const port =process.env.PORT || 5000; 
const { application } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('raj-tourist-service server is running');
})