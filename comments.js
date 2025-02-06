// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Create comments
const comments = [
    { id: 1, author: 'John', body: 'Hello everyone' },
    { id: 2, author: 'Jane', body: 'How are you?' }
];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by ID
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    res.json(comment);
});

// Create a comment
app.post('/comments', (req, res) => {
    const comment = { id: comments.length + 1, author: req.body.author, body: req.body.body };
    comments.push(comment);
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    comment.author = req.body.author;
    comment.body = req.body.body;
    res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Comment not found');
    }
    comments.splice(index, 1);
    res.send('Comment deleted');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});