const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");

// Parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that was so funny",
  },
  {
    id: uuid(),
    username: "Jerry",
    comment: "lol that was so funny",
  },
  {
    id: uuid(),
    username: "Eddie",
    comment: "lol that was so funny",
  },
  {
    id: uuid(),
    username: "Eduar",
    comment: "lol that was so funny",
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

// PATCH request

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find(c => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect('/comments')
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
