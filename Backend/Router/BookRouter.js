
const express=require("express")
const { Router } = require("express");
const { BookModel } = require("../Model/BookModel");
const app = express();

const bookRoute = Router();

bookRoute.get("/books/:id",async(req,res)=>{
    const ID = req.params.id
    try {
        let data =await BookModel.find({_id:ID})
        res.send(data)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

bookRoute.get("/books", async (req, res) => {
  const price_low = req.query.price_low;
  const price_high = req.query.price_high;
  const genre=req.query.genre
  const author=req.query.author
  if (price_high && price_low) {
    try {
      let books = await BookModel.find({
        $and: [{ price: { $gt: price_low } }, { price: { $lt: price_high } }],
      });
      res.send(books);
    } catch (error) {
      console.log(err);
      res.status(500).send({ message: err.message });
    } 
  
  }else if(genre){
     try {
       let books = await BookModel.find({
        genre: { $regex: `${genre}`, $options: "i" },
      });
       res.send(books)
     } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
     }
  }else if(author){
    try {
      let books = await BookModel.find({
        author: { $regex: `${author}`, $options: "i" },
      });
      res.send(books)
    } catch (err) {
     console.log(err);
     res.status(500).send({ message: err.message });
    }
 }
   else {
    try {
      let books = await BookModel.find();
      res.send(books);
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  }
});


bookRoute.post("/books", async (req, res) => {
  try {
    //  const movie = new BookModel(req.body)
    //  await movie.save()
    await BookModel.insertMany(req.body);
    res.status(201).send({ msg: "Book has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

bookRoute.put("/books/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await BookModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({msg:`Books with id:${ID} has been updated`});
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

bookRoute.delete("/books/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await BookModel.findByIdAndDelete({ _id: ID });
    res.send({msg:`Books with id:${ID} has been deleted`});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = { bookRoute };
