const express = require("express");
const app = express();

// Parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// GET request

app.get("/tacos", (req, res) => {
  res.send("Get /tacos response");
});

// POST request

app.post("/tacos", (req, res) => {
  const {meat, qty} = req.body;
  res.send(`Ok, here are your ${qty} ${meat} tacos`);
});

app.listen(3000, () => {
  console.log("On port 3000");
});

// RESTful operations

// GET /comments - list all comments
// POST /comments - create a new comment

// GET /comment:id - Get one comment (using ID)
// Patch /comments/:id - update one comment
// Delete /comments/:id - remove/delete one comment