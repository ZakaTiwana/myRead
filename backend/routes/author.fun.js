import  Author from '../models/author' ;
import Book from '../models/book' ;

import bcrypt from 'bcrypt' ;
const SALT_WORK_FACTOR = 10;

import {
  delete_data_of_book
} from './book.fun';


/* get all author . */
export function getAllAuthor(req, res, next) {
  let authors = [];

  Author.find({})
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        res.json({
          error: "no author"
        });
        return;
      }
      data.forEach((val, i) => {
        var author = {
          _id: null,
          name: null,
          about_self: null,
          joined: null,
        };

        author._id = val._id;
        author.name = val.name;
        author.about_self = val.about_self;
        author.joined = val.joined;

        authors.push(author);
        if (i == data.length - 1) {
          res.json(authors);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}


/* get specific author data. */
export function getAuthorByID(req, res, next) {
 
  let author = {
    _id: null,
    name: null,
    about_self: null,
    joined: null,
  };

  Author.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        res.json({
          error: "not author with provided key"
        });
        return;
      }
      console.log(doc);
      author._id = doc._id;
      author.name = doc.name;
      author.about_self = doc.about_self;
      author.joined = doc.joined;
      res.json(author);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}


/* get specific author data. */
export function getAuthorByName(req, res, next) {
 
  let author = {
    _id: null,
    name: null,
    about_self: null,
    joined: null,
  };

  Author.findOne({name:req.params.name})
    .then((doc) => {
      if (!doc) {
        res.json({
          error: "not author with provided name"
        });
        return;
      }
      console.log(doc);
      author._id = doc._id;
      author.name = doc.name;
      author.about_self = doc.about_self;
      author.joined = doc.joined;
      res.json(author);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}


export function searchAuthorByName(req,res, next){
  if(!req.body.name){
    res.json({error:"name is a required feild"});
    return;
  }
  Author.find({name:new RegExp(req.body.name,"i")})
  .then(doc=>{
    if(doc.length == 0){res.json({error:"no match"});return;}
    console.log(doc);
    res.json(doc);
  })
  .catch(err =>{
    console.log(err);
    res.json({error:err});
  });
}



/* add a author. */
export function postAuthor(req, res, next) {

  if (!req.body.name) {
    res.json({
      error: "name key is required"
    });
    return;
  } else if (!req.body.password) {
    res.json({
      error: "password key is required"
    });
    return;
  }


  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {

    // hash the password using our new salt
    bcrypt.hash(req.body.password, salt, function (err, hash) {

      let NewAuthor = new Author({
        name: req.body.name,
        password: hash,
        about_self: req.body.about_self,
      }); // this is modal object.

      NewAuthor.save()
        .then((data) => {
          console.log(data);
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    });
  });


}




export function updateAuthor(req, res, author, next) {

  author.about_self = req.body.about_self;
  if (!req.body.password) {
    author.save();
    res.json({
      msg: "author updated"
    });
    return;
  }
  Author.findById(author._id)
    .then(doc => {
      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        // hash the password using our new salt
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          doc.password = hash;
          doc.about_self = author.about_self;
          console.log(doc);
          doc.save();
          res.json({msg:"author updated"});
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });

}




/* delete a author. */
export function deleteAuthor(req, res, author, next) {

  Book.find({
      'author_detail.id': author._id
    })
    .then(books => {
      if (books.length != 0) {
        books.forEach(book => {
          delete_data_of_book(book);
        });
      }

      Author.deleteOne({
          _id: author._id
        })
        .then((msg) => {
          if (msg.n == 1) {
            res.json({
              msg: "author deleted sucessfuly"
            });
          } else {
            res.json({
              error: "auhtor could not be deleted"
            });
          }

        })
        .catch((err) => {
          res.json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}