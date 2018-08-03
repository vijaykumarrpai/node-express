const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

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

// REST Handler
// app.METHOD(PATH, HANDLER)

// REST - Representational State Transfer Protocol
// TO PERFORM AN OPERATION ON A RESOURCE / DATA YOU WILL NEED TO GO TO A END POINT WIHT A SPECIFIC HTTP METHOD

// dummy db
let products = [
    {
        id: 1,
        name: 'Marker',
        price: 15
    },
    {
        id: 2,
        name: 'Scale',
        price: 5
    },
    {
        id: 3,
        name: 'Board',
        price: 75
    }
];

//READ
// GET - /products
// GET - /products/:id (shows a specific product)
// app.METHOD(PATH, HANDLER)
app.get('/products', (req,res) => {
    //write code to get the data from the database
    // res.send({
    //     msg: 'get request made for /products'
    // });
    res.send(products);
});

// GET - /products/:id (show a specific product)
app.get('/products/:id', (req,res) => {
    let product = products.find((product) => {
        return product.id == req.params.id;
    });
    if(product) { // if product record is found
        res.send(product);
    } else { // if product record is not found
        res.send({
            notice: `product with id ${req.params.id} not found`
        })
    }
});

// CREATE
// POST - /products
// app.METHOD(PATH, HANDLER)
app.post('/products', (req,res) => {
    // write code to insert the record into the database
//     res.send({
//         msg: 'post request made for /products'
//     });
// });
    let product = req.body;
    products.push(product);
    res.send({
        product,
        notice: 'succesfully created a product'
    });
});

// UPDATE
// PUT - /products/:id
app.put('/products/:id', (req,res) => {
    // write code to find the record and update the record inside the database
//     res.send({
//         msg: `put request made for /products/${req.params.id}`
//     });
// });
    let product = products.find((product) => {
        return product.id = req.params.id;
    });

    if(product) {
        product.price = req.body.price;
        res.send({
            product,
            notice: 'Successfully updated the product'
        });
    } else {
        res.send({
            notice: `product with id ${req.params.id} is not found`
        })
    }
});

// DESTROY
// DELETE - /products/:id
app.delete('/products/:id', (req,res) => {
    // write code to find the record and remove the record from the database
//     res.send({
//         msg: `delete request made for /products/${req.params.id}`
//     });
// });
    let index = products.findIndex((product) => {
        return product.id == req.params.id;
    });

    if(index >= 0) {
        products.splice(index,1);
        res.send({
            notice: 'successfully removed the product'
        })
    } else {
        res.send({
            notice: `product with id ${req.params.id} is not found`
        })
    }
});
app.listen(port, () => {
    console.log('Listening on port', port);
})