// var mongoose = require("mongoose");

import { Schema,model } from 'mongoose';
// var Schema = mongoose.Schema;


var BooksSchema = new Schema({
    title : {type: String, require:true, index: {unique:true}},
    published: {type: Date , default:Date.now},
    author_detail:{
        id:{
            type:Schema.ObjectId,
            ref:"Author"
        },
        name:{type:String, required:true}
    },
    details:{
        description:String,
        rating:{type:Number , min:0, max:5},
        total_rated:{type:Number, min:1},
        total_score:{type:Number, min:0}
    },
    tag:[{
        type: String
    }],
    content:{type: String, require:true},
    img:{type:String,unique:true},
    latest_chapter:{type:Number, default:0,min:0},
    status:{type: String, validate: /^$|^ongoing$|^completed$/,default:"ongoing" },
    chapters : [{type:String}]
});

export default model( "Book", BooksSchema);