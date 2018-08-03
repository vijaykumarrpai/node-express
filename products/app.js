const express = require('express');
const app = express();

const port = 3000;

// logger middleware
app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
});

app.get('/', (req,res) => {
    res.send({
        msg: 'welcome to our ecommerce store'
    })
});

// REST - Representational State Transfer Protocol
// TO PERFORM AN OPERATION ON A RESOURCE / DATA YOU WILL NEED TO GO TO A END POINT WIHT A SPECIFIC HTTP METHOD

//READ
// GET - /products
// GET - /products/:id (shows a specific product)
// app.METHOD(PATH, HANDLER)
app.get('/products', (req,res) => {
    //write code to get the data from the database
    res.send({
        msg: 'get request made for /products'
    });
});

// CREATE
// POST - /products
// app.METHOD(PATH, HANDLER)
app.post('/products', (req,res) => {
    // write code to insert the record into the database
    res.send({
        msg: 'post request made for /products'
    });
});

// UPDATE
// PUT - /products/:id
app.put('/products/:id', (req,res) => {
    // write code to find the record and update the record inside the database
    res.send({
        msg: `put request made for /products/${req.params.id}`
    });
});

// DESTROY
// DELETE - /products/:id
app.delete('/products/:id', (req,res) => {
    // write code to find the record and remove the record from the database
    res.send({
        msg: `delete request made for /products/${req.params.id}`
    });
});

app.listen(port, () => {
    console.log('Listening on port', port);
})