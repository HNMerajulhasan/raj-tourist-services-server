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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0vbsoxh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      const serviceCollection=client.db('touristServices').collection('services')
      const reviewCollection=client.db('touristServices').collection('reviews');

       app.get('/services',async(req,res)=>{
        const query={}
        const cursor=serviceCollection.find(query);
        const services=await cursor.limit(3).toArray();
        res.send(services);
     });