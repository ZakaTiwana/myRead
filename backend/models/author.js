// var mongoose = require("mongoose");
import { Schema,model } from 'mongoose';
// var Schema = mongoose.Schema;
// import bcrypt from 'bcrypt' ;

var AuthorsSchema = new Schema({
    name : {type: String, require:true, index : {unique:true} },
    password: {type:String, require:true},
    about_self: String,
    joined: {type: Date , default:Date.now}
});





//  AuthorsSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

export default model( "Author", AuthorsSchema);