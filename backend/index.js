const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_PAYMENT_SECRET);

//middleware
app.use(express.json());
app.use(cors({
  origin : ["https://mern-rms.netlify.app"]
}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xslrw3a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const roomsCollection = client.db("Hotel-Booking").collection("allRooms");
    const usersCollection = client.db("Hotel-Booking").collection("users");
    const bookingCollection = client.db("Hotel-Booking").collection("bookings");
    const reviewCollection = client.db("Hotel-Booking").collection("review");
    const favouriteCollection = client.db("Hotel-Booking").collection("wishlist");

    app.get("/rooms", async (req, res) => {
      const query = {};
      const { guest, bathrooms, bedrooms, category } = req.query;
  
      if (category) {
        query.category = category;
      }
      
      query.status = 'active';
    
      if (req.query.location) {
        query.location = {
          $regex: ".*" + req.query.location + ".*",
          $options: "i",
        };
      }
      if (guest) {
        query.guests = { $gte: +guest };
      }
      if (bathrooms) {
        query.bathrooms = { $gte: +bathrooms };
      }
      if (bedrooms) {
        query.bedrooms = { $gte: +bedrooms };
      }

      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/dashboard/rooms", async (req, res) => {
      const email = req.query.email;
      const filter = {};
      if (email) {
        filter["host.email"] = email;
      }
      const result = await roomsCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/rooms/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await roomsCollection.findOne(filter);
      res.send(result);
    });

    app.post("/rooms", async (req, res) => {
      const body = req.body;
      const result = await roomsCollection.insertOne(body);
      res.send(result);
    });

    app.delete("/rooms/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await roomsCollection.deleteOne(filter);
      res.send(result);
    });

    app.patch("/rooms/:id", async (req, res) => {
      const id = req.params?.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await roomsCollection.updateOne(filter, updatedDoc,options);
      res.send(result);
    });

    app.put("/rooms/:id", async (req, res) => {
      const id = req.params?.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          ...req.body
        },
      };
      const result = await roomsCollection.updateOne(filter, updatedDoc,options);
      res.send(result);
    });
    
    //user collection

    app.post("/users", async (req, res) => {
      const body = req.body
      const filter = { email: req?.body?.email };
      console.log(filter);
     
      const query = await usersCollection.findOne(filter);
      if (query) {
        return res.status(400).json({ message: "User with this email already exists" });
      } 
        const result = await usersCollection.insertOne(body);
        res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await usersCollection.findOne(filter);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params?.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          role: req.body.role,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    //booking collection
    app.post("/bookings", async (req, res) => {
      const body = req.body;
      const result = await bookingCollection.insertOne(body);
      res.send(result);
    });

    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { roomId: id };
      const result = await bookingCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const filter = { userEmail: email };
      const result = await bookingCollection.find(filter).toArray();
      res.send(result);
    });

    app.get("/dashboard/bookings", async (req, res) => {
      const email = req.query.email;
      const filter = {};
      if (email) {
        filter["host"] = email;
      }
      const result = await bookingCollection.find(filter).toArray();
      res.send(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(filter);
      res.send(result);
    });

    //admin dashboard information
    app.get("/admin/dashboard", async (req, res) => {
      const revenue = await bookingCollection.find().toArray();
      const totalRevenue = revenue.reduce(
        (total, curr) => total + curr.totalPrice,
        0
      );
      // total manager
      const manager = await usersCollection.find({ role: "creator" }).toArray();
      //toital user
      const user = await usersCollection.find({ role: "user" }).toArray();
      //total rooms
      const rooms = await roomsCollection.estimatedDocumentCount();
      res.send({
        totalRevenue,
        manager: manager.length,
        user: user.length,
        rooms,
      });
    });

    app.get('/dashboard/analytics',async(req,res)=>{
      const projection = {
        _id: 1,
        userEmail: 1,
        userName: 1,
        userProfile: 1,
        totalPrice: 1,
        bookingDate:1
      };
      const result = await bookingCollection.find().project(projection).toArray()
      res.send(result)
    })

    app.get('/manager/dashboard',async(req,res)=>{
      const {email} = req.query
      const query = {host:email}
      const projection = {_id:1,totalPrice: 1,host:1}
      const totalBookings = await bookingCollection.find(query).project(projection).toArray();
      const filter = {"host.email" : email}
      const projection2 = {_id:1,status:1}
      const rooms = await roomsCollection.find(filter).project(projection2).toArray()
      res.send({rooms,totalBookings})
    })

    //srtipe payment intregation
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    //review
    app.post("/review", async (req, res) => {
      const body = req.body;
      const result = await reviewCollection.insertOne(body);
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().limit(5).toArray();
      res.send(result);
    });

    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { roomId: id };
      const result = await reviewCollection.find(filter).toArray();
      res.send(result);
    });

    //wishlist
    app.post('/wishlist',async(req,res)=>{
      const body = req.body;
      const result = await favouriteCollection.insertOne(body)
      res.send(result)
    })

    app.get('/wishlist',async(req,res)=>{
      const query = {}
      if(req?.query?.emai){
        query.email = req?.query?.email;
      }
      const result = await favouriteCollection.find(query).toArray()
      res.send(result)
    })

    app.delete('/wishlist/:id',async(req,res)=>{
      const id = req?.params?.id;
      const filter = {_id: new ObjectId(id)}
      const result = await favouriteCollection.deleteOne(filter)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to airbnb");
});

app.listen(port, () => {
  console.log(`Airbnb listening on port ${port}`);
});
