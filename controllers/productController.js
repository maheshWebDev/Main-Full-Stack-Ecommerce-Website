const book = require('../models/ProductsModel');

module.exports.addProduct = (req,res)=>{
    console.log(req.body)
  
    book.create({
        title : req.body.title,
        ImageURL :req.body.imgUrl,
        Price : req.body.price
    })
    .then(res.sendStatus(200))
    .catch((err)=>{
        console.log(err)
    })
   
}

module.exports.getProducts = (req,res)=>{
book.findAll().then((result)=>{
    res.status(200).json(result);
}).catch((err)=>{
    console.log(err);
})
}