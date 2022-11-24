const express=require('express');
const app=express();
const cors=require('cors')
const port =process.env.PORT || 5000; 
const { application } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

//Used Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('raj-tourist-service server is running');
})

//mongodb Database added
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0vbsoxh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      const serviceCollection=client.db('touristServices').collection('services')
      const reviewCollection=client.db('touristServices').collection('reviews');
      app.post('/Allservices',async(req,res)=>{
        const service=req.body;
        console.log(service);
        const result=await serviceCollection.insertOne(service);
        res.send(result);
      })

       app.get('/services',async(req,res)=>{
        const query={}
        const cursor=serviceCollection.find(query);
        const services=await cursor.limit(3).toArray();
        res.send(services);
     });
     app.get('/Allservices',async(req,res)=>{
        const query={}
        const cursor=serviceCollection.find(query);
        const services=await cursor.toArray();
        res.send(services);
     });
     app.get('/Allservices/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const service=await serviceCollection.findOne(query);
        res.send(service);
     });

     //reviews API create
    
      app.get('/reviews',async(req,res)=>{
        let query={};
        if(req.query.email){
           query={
             email:req.query.email
           } 
        }
        const cursor=reviewCollection.find(query);
        const reviews=await cursor.toArray();
        res.send(reviews);
    });
//review id section
    app.get('/reviews/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: ObjectId(id)};
      const review=await reviewCollection.findOne(query);
      res.send(review);
    });

    //update crud
    app.put('/reviews/:id',async(req,res)=>{
      const id=req.params.id;
      const filter={_id: ObjectId(id)};
      const user=req.body;
      const option={upsert: true};
      const updatedUser={
         $set:{
           customer:user.firstName,
           address:user.address,
           email:user.email,
           message:user.message
         }
       }
         const result=await reviewCollection.updateOne(filter,updatedUser,option);
         res.send(result);
    })

      app.post('/reviews',async(req,res)=>{
         const review=req.body;
         const result=await reviewCollection.insertOne(review);
         res.send(result);
      });
 //Deleted crud operation
      app.delete('/reviews/:id',async(req,res)=>{
         const id =req.params.id;
         const query={_id:ObjectId(id)}
         const result=await reviewCollection.deleteOne(query);
         res.send(result);
       })

    }
    finally{
         
    }
}
run().catch(err=>console.error(err));





app.listen(port,()=>{
    console.log(`raj-tourist-service server running On ${port}`);
})