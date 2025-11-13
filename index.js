const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server is running!')
})

// Assignment
// Jo2ok9bmL2ofqRCS

const uri = "mongodb+srv://Assignment:Jo2ok9bmL2ofqRCS@cluster0.2rfkb4j.mongodb.net/?appName=Cluster0";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2rfkb4j.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db=client.db('data');
// const db=client.db('smart_db');
const productCollection = db.collection('products');

app.post('/products',async(req,res)=>{
    const newProduct = req.body;
    const result=await productCollection.insertOne(newProduct);
    res.send(result);
})

app.get('/products',async(res,req)=>{
    const projectsCollection={category:6,name:6,price:6,image:6,location:6,button:6}
    const cursor =productCollection.find().limit(6).project();
    const result= await cursor.toArray();
    res.send(result);
})
app.delete('/products/:id',async(req,res)=>{
    const id = req.params.id;
    const query ={_id: new ObjectId(id)}
    const result =await productCollection.deleteOne(query);
    res.send(result);
})

// bids related apis
app.get ('/bids',async(req,res)=>{
    const email = req.query.email;
    const query={};
    if(email){
        query.bidder_email=email;
    }
  const cursor=bidsCollection.find();
  const result=await cursor.toArray();
  res.send(result);
})


// async function run() {
//   try {
   
    // await client.connect();
   
    // await client.db("admin").command({ ping: 1 });
   
//   } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
//   }
// }
// run().catch(console.dir);

 console.log("Pinged your deployment. You successfully connected to MongoDB!");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
