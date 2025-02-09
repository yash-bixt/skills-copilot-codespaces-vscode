// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the path to the comments file
const commentsPath = path.join(__dirname, 'comments.json');

// Define the function to read the comments file
function readComments() {
  return JSON.parse(fs.readFileSync(commentsPath));
}

// Define the function to write the comments file
function writeComments(comments) {
  fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
}

// Define the route to get all comments
app.get('/comments', (req, res) => {
  res.json(readComments());
});

// Define the route to add a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  comments.push(req.body);
  writeComments(comments);
  res.json(comments);
});

// Define the route to delete a comment
app.delete('/comments/:id', (req, res) => {
  const comments = readComments();
  const index = comments.findIndex(comment => comment.id === req.params.id);
  if (index !== -1) {
    comments.splice(index, 1);
    writeComments(comments);
  }
  res.json(comments);
});

// Start the web server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
