const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');

// middleware
app.use(express.json());
app.use(cors());
connectDB(); 

app.post( "/register" , async (req,res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post( "/login", async (req,res) => {
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password');
        if(user){
            res.send(user);
        }
        else{
            res.status(401).send({message: "Invalid email or password"});
            alert('Invalid email or password');
        } 
    }
    else{ 
        res.status(401).send({message: "Enter email and password"}); 
    }
})

app.post("/add-product" , async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products", async (req,res) => {
    let product = await Product.find();
    if(product.length > 0){
        res.send(product);
    }else{
        res.send({message: "No products found"});
    }
})

app.delete("/product/:id", async (req, res) =>{
    // res.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
}) ;

app.get("/product/:id", async (req,res) => {
    let product = await Product.findOne({_id:req.params.id});
    res.send(product);
});

app.put("/product/:id" , async (req,res) => {
    let product = await Product.updateOne({_id:req.params.id},
        {
            $set: req.body
        }
    )
    res.send(product)
})

app.get('/search/:key' , async (req, res) => {
    let search = await Product.find({
        "$or" : [
            {name: {$regex:req.params.key}},
            {category: {$regex:req.params.key}},
            {company: {$regex:req.params.key}}
        ]
    });
    res.send(search);
})

app.listen(5000, () => { 
    console.log('Server is running on port 5000'); 
});