const userRoutes = require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


// Create an Express application
const app = express();

// Set the port for the server to listen on
const port = 3000; // You can change this to your desired port number
// Connect to MongoDB
const uri =
  "mongodb+srv://nagendratere:r3HE0ekTxIfXbZaN@cluster0.wtsfnuf.mongodb.net/UserDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors());

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running..");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
