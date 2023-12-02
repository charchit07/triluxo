
const mongoose =require("mongoose")
const bookSchema = mongoose.Schema({
    title:{
        type:String,
    },
    genre:{
        type:String,
      
    },
    price:{
        type:Number,
      
    },
    author:{
        type:String,
     
    },
},{
    versionKey:false
})

// Model for the data

const BookModel = mongoose.model("book",bookSchema)

module.exports ={BookModel}