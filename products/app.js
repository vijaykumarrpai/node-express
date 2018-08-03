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

let categories = [
    {
        id: 1,
        name: 'Sports'
    },
    {
        id: 2,
        name: 'Stationary'
    }
]

// dummy db
let products = [
    {
        id: 1,
        name: 'Marker',
        price: 15,
        category_Id: 2
    },
    {
        id: 2,
        name: 'Scale',
        price: 5,
        category_Id: 1
    },
    {
        id: 3,
        name: 'Board',
        price: 75,
        category_Id: 1
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

app.get('/categories', (req,res) => {
    res.send(categories);
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


app.get('/categories/:id', (req,res) => {
    let category =  categories.find((category) => {
        return category.id == req.params.id;
    });
    if(category) {
        res.send(category);
    } else {
        res.send({
            notice: `category with id ${req.params.id} not found`
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
        notice: 'successfully created a product'
    });
});

app.post('/categories', (req,res) => {
    let category = req.body;
    categories.push(category);
    res.send({
        category,
        notice: 'successfully created a category'
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

app.put('/categories/:id', (req,res) => {
    let category = categories.find((category) => {
        return category.id = req.params.id;
    });

    if(category) {
        category.name = req.body.price;
        res.send({
            category,
            notice: 'Successfully updated the category'
        });
    } else {
        res.send({
            notice: `category with id ${req.params.id} is not found`
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

app.delete('/categories/:id', (req,res) => {
    let index = categories.findIndex((category) => {
        return category.id == req.params.id;
    });

    if(index >= 0) {
        categories.splice(index,1);
        res.send({
            notice: 'successfully removed the category'
        })
    } else {
        res.send({
            notice: `category with id ${req.params.id} is not found`
        })
    }
});

app.listen(port, () => {
    console.log('Listening on port', port);
})