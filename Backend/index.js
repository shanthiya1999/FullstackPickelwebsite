const express=require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { ObjectId } = require("mongodb");
const port = 4000;
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(url);
app.use("/uploads", express.static("uploads"));
let db;
client.connect().then(() => {
  console.log("Connected to MongoDB");
  db = client.db("pickleDB");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

app.get("/pickles", (req, res) => {
  console.log("Route hit");
  db.collection("pickle").find().toArray().then((data) => {
    console.log("Data:", data);
    if (data.length === 0) {
      return res.send("No data found");
    }
    res.json(data);
  });
});

app.get("/viewcart/:email", (req, res) => {
  const email = req.params.email;
  console.log("Fetching cart for:", email);
  db.collection("carts").find({ userEmail: email }).toArray().then((data) => {
    console.log("Cart data:", data);
    res.json(data);
  })
  .catch((err) => {
    console.error("Error fetching cart:", err);
    res.status(500).send("Error fetching cart");
  });
});

app.post("/addtocart", (req, res) => {
  console.log("post request received");
  const cartItem = req.body;
  const { name, userEmail } = cartItem;

  // Check if item already exists in user's cart
  db.collection("carts").findOne({ name, userEmail }).then((existingItem) => {
    if (existingItem) {
      // If item exists, increment quantity
      db.collection("carts").updateOne(
        { _id: existingItem._id },
        { $inc: { quan: 1 } }
      ).then(() => {
        res.send("Quantity updated successfully");
      })
      .catch((err) => {
        console.error("Error updating quantity:", err);
        res.status(500).send("Error updating quantity");
      });
    } else {
      // If item doesn't exist, insert new entry
      delete cartItem._id;
      db.collection("carts").insertOne(cartItem).then(() => {
        res.send("Data inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
      });
    }
  });
});

app.delete("/deletecart/:id", (req, res) => {
  console.log("Delete request received");
  const id = req.params.id;
  console.log("Delete request received for ID:", id);
  db.collection("carts").deleteOne({ _id: new ObjectId(id) }).then(() => {
    res.send("Item deleted successfully");
  })
  .catch((err) => {
    console.error("Error:", err);
    res.status(500).send("Error deleting item");
  });
});

app.patch("/increase/:id", (req, res) => {
  const id = req.params.id;
  db.collection("carts")
    .updateOne(
      { _id: new ObjectId(id) },
      { $inc: { quan: 1 } }
    )
    .then(() => {
      res.send("Quantity increased");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error");
    });
});

app.patch("/decrease/:id", (req, res) => {
  const id = req.params.id;
  db.collection("carts").updateOne(
    { _id: new ObjectId(id) },
    { $inc: { quan: -1 } }
  )
  .then(() => res.send("Decreased"))
  .catch(err => res.status(500).send("Error"));
});

app.post("/register", (req, res) => {
  console.log("Register request received");
  const user = req.body;
  console.log("Received user data:", user);
  db.collection("users").insertOne(user)
    .then(() => {
      res.send("User registered successfully");
    })
    .catch((err) => {
      console.error("Error inserting user:", err);
      res.status(500).send("Error registering user");
    });
});

app.post("/login", (req, res) => {
  console.log("Login request received");
  const { email, password } = req.body;
  db.collection("users").findOne({ email, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).send("Error logging in");
    });
});

app.post("/placeorder", (req, res) => {
  console.log("Place order request received");
  const order = req.body;
  order.createdAt = new Date();
  db.collection("orders").insertOne(order)
    .then(() => {
      db.collection("carts").deleteMany({ userEmail: order.userEmail }).then(() => {
        res.status(200).json({ message: "Order placed successfully" });
      });
    })
    .catch((err) => {
      console.error("Error placing order:", err);
      res.status(500).send("Error placing order");
    });
});

app.get("/orders/:email", (req, res) => {
  const email = req.params.email;
  db.collection("orders").find({ userEmail: email }).sort({ createdAt: -1 }).toArray()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.error("Error fetching orders:", err);
      res.status(500).send("Error fetching orders");
    });
});
