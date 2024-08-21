const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require('method-override')

// Parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lololol",
  },
  {
    id: uuid(),
    username: "Jerry",
    comment: "YEEEER",
  },
  {
    id: uuid(),
    username: "Eddie",
    comment: "Coding is awesome!",
  },
  {
    id: uuid(),
    username: "Eduar",
    comment: "Test",
  },
];

// GET request

app.get("/tacos", (req, res) => {
  res.send("Get /tacos response");
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find( c => c.id === id);
  res.render("comments/edit", { comment });
});

// PATCH request

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

// POST request

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Ok, here are your ${qty} ${meat} tacos`);
});

app.post("/comments", (req, res) => {
  const { comment, username } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
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
