import fs from "fs" ;
import Book from "../models/book" ;
import  multer from "multer" ;
import path from "path" ;

var storage = multer.diskStorage({
  destination: function (req,file,next) {
  next(null,`${__dirname.replace("\\routes","")}/public/images/books_img`);
},
filename: function (req,file,next) {
  
    Book.findById(req.params.id)
    .then(doc=>{
      if(!doc){res.json({error:"no book with provided id"});return;}
      if(!doc.author_detail.id.equals(req.author._id)){res.json({error:"access denied"});return;}
      const url = "/images/books_img/"+space_to_dash(doc.title.toLowerCase()) + path.extname(file.originalname);
      doc.url = url;
      doc.save();
      next(null, space_to_dash(doc.title.toLowerCase()) + path.extname(file.originalname));  
    })
    .catch(err=>{
        console.log(err);
        res.json({error:err});
    });
}
});
export var upload = multer({storage:storage}); 
export function updateImg(req, res, author, next){
  res.json({msg:"file uploaded successfully"});
  console.log("file saved");
}
export function rateBook(req, res, author, next){
  if (!req.body.rating){res.json({error:"rating is a required feild"});return;}
  Book.findById(req.params.id)
  .then(doc => {
    if (!doc) {
      res.json({
        error: "book not found"
      });
      return;
    }
    
    if(!doc.details.total_score) doc.details.total_score = req.body.rating;
    else doc.details.total_score += req.body.rating;

    doc.details.total_score = Math.round(doc.details.total_score + "e+2") + "e-2";

    if (!doc.details.total_rated) doc.details.total_rated = 1;
    else doc.details.total_rated ++;

    doc.details.rating =Math.round((doc.details.total_score / doc.details.total_rated) + "e+2") + "e-2" ;
    console.log(doc);
    doc.save();
    res.json({msg:"rated successfully"});
  })
  .catch(err => {
    console.log(err);
    res.json({
      error: err
    });
  });
}



export function getChapter(req, res, next) {

  Book.findById(req.params.id)
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      let flag = false;
      console.log(doc.chapters);
      console.log(doc.chapters.length);
      for (let index = 0; index < doc.chapters.length; index++) {
        const element = doc.chapters[index];
        let check = dash_to_space(req.params.chapter_name.toLowerCase());
        console.log(check);
        if (element == check) {
          // console.log("idrun");
          flag = true;
          break;
        }
      }
      if (flag) {
        let chapter_name = space_to_dash(req.params.chapter_name.toLowerCase());
        res.sendFile(`${__dirname.replace("\\routes","")}/public/${doc.content}/${chapter_name}.txt`);
        console.log("file send");
      } else {
        console.log({
          error: "chapter not found"
        });
        res.json({
          error: "chapter not found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}

export function searchBookByTitle(req,res,next){
  if(!req.body.title){
    res.json({error:"title is a required feild"});
    return;
  }
  Book.find({title:new RegExp(req.body.title,"i")})
  .then(doc=>{
    if(doc.length==0){res.json({error:"no match"});return;}
    console.log(doc);
    res.json(doc);
  })
  .catch(err =>{
    console.log(err);
    res.json({error:err});
  });
}

export async function searchBookByTag(req, res, next) {
  
  try{
    const doc = await Book.find({});
    if (doc.length == 0){
      res.json({
        error: "no book in record"
      });
      return;
    }

    let found_book = [];
    for (let i = 0; i< doc.length; i++) {
      for (let index = 0; index < doc[i].tag.length; index++) {
        if(doc[i].tag[index].toLowerCase() == req.body.tag.toLowerCase()){
          found_book.push(doc[i]);
        }
      }      
    }

    console.log(found_book);
    res.json(found_book);

  } catch(err) {
    console.log(err);
    res.json({
      error: err
    });
  }

  // Book.find({})
  // .then(doc => {
  //   if (doc.length == 0) {
  //     res.json({
  //       error: "no book in record"
  //     });
  //     return;
  //   }
  //   let found_book = [];
  //   for (let i = 0; i< doc.length; i++) {
  //     for (let index = 0; index < doc[i].tag.length; index++) {
  //       if(doc[i].tag[index].toLowerCase() == req.body.tag.toLowerCase()){
  //         found_book.push(doc[i]);
  //       }
  //     }      
  //   }

  //   console.log(found_book);
  //   res.json(found_book);
  // })
  // .catch(err => {
    
  // });
}

/* get all books . */
export function getAllBook(req, res, next) {

  Book.find({})
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        res.json({
          error: "no books in database"
        });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}

export function getAuthorBook(req, res, next) {
  Book.find({
      'author_detail.id': req.params.id
    })
    .then(doc => {
      if (!doc) {
        res.json({
          error: "no book of this author"
        });
        return;
      }
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}

/* get specific book by id. */
export function getBook(req, res, next) {
  Book.findById(
      req.params.id
    )
    .then((doc) => {
      if (doc) {
        res.json(doc);
      } else {
        res.json({
          error: "book not found"
        });
      }

    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}


/* get specific book by title. */
export function getBookbyTitle(req, res, next) {
  Book.findOne({
      title: req.params.name.toLocaleLowerCase()
    })
    .then((doc) => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      console.log(doc);
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
}



/* add a book. */
export function postBook(req, res, author, next) {

  // check for title and author_id
  if (!req.body.title) {
    res.json({
      error: "title is a required key"
    });
    return;
  }

  let title = space_to_dash(req.body.title.toLowerCase());

  Book.findOne({
      title: req.body.title
    })
    .then((doc) => {
      if (doc) {
        res.json({
          error: "title already taken"
        });
        return;
      } else {
        //make dir
        if (!fs.existsSync(`${__dirname.replace("\\routes","")}/public/books_content/${title}`)) {
          fs.mkdir(`${__dirname.replace("\\routes","")}/public/books_content/${title}`, (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("directory created: /public/books_content/" + title);

          });
        }


        //create a default img.
        fs.createReadStream(`${__dirname.replace("\\routes","")}/public/images/empty_book_blue.png`)
          .pipe(fs.createWriteStream(`${__dirname.replace("\\routes","")}/public/images/books_img/${title}.jpg`))
          .on("finish", () => {
            console.log("defalut img copied to public/images/books_img/" + title + ".jpg");
          });

        let NewBook = new Book({
          title: req.body.title,
          author_detail: {
            id: author._id,
            name: author.name,
          },
          details: {
            description: req.body.description,
            rating: req.body.rating,
          },
          tag: req.body.tag,
          content: `/books_content/${title}`,
          img: `/images/books_img/${title}.jpg`,
          latest_chapter: req.body.latest_chapter,
          status: req.body.status
        }); // this is modal object.

        NewBook.save()
          .then((data) => {
            console.log(data);
            res.json(data);
          })
          .catch((err) => {
            console.log(err);
            res.json({
              error: "book could not be saved"
            });
            return;
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: "some error occured when checking if book title is already taken, try again",
        details: err
      });
      return;
    });
}




export function updateBookByID(req, res, author, next) {

  if (!req.body.book_id) {
    res.status({
      error: "book_id is a required feild"
    });
    return;
  }
  Book.findById(req.body.book_id)
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access not allowed"
        });
        return;
      }
      doc.details.description = req.body.description;
      if (req.body.status == 'ongoing' || req.body.status == 'completed') {
        doc.status = req.body.status;
      }
      doc.tag = req.body.tag;

      console.log(doc);
      doc.save();
      res.json({
        msg: "book updated"
      });

    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}



export function updateBookByName(req, res, author, next) {

  if (!req.body.book_name) {
    res.status({
      error: "book_name is a required feild"
    });
    return;
  }
  Book.findOne({
      title: req.body.book_name
    })
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access not allowed"
        });
        return;
      }
      doc.details.description = req.body.description;
      if (req.body.status == 'ongoing' || req.body.status == 'completed') {
        doc.status = req.body.status;
      }
      doc.tag = req.body.tag;

      console.log(doc);
      doc.save();
      res.json({
        msg: "book updated"
      });

    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}




export function addChapterByID(req, res, author, next) {
  
  if (!req.body.book_id) {
    res.json({
      error: "book id is a required feild"
    });
    return;
  }
  if (!req.body.chapter_name) {
    res.json({
      error: "chapter_name is a required feild"
    });
    return;
  }
  if (!re.body.content) {
    res.json({
      error: "content is a required feild"
    });
    return;
  }

  Book.findById(req.body.book_id)
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access denied"
        });
        return;
      }
      for (let index = 0; index < doc.chapters.length; index++) {
        const element = doc.chapters[index];
        if (element == req.body.chapter_name) {
          res.json({
            error: "chapter name already taken"
          });
          return;
        }
      }
      doc.chapters.push(req.body.chapter_name);
      doc.latest_chapter += 1;
      let chapter_name = space_to_dash(req.body.chapter_name.toLowerCase());
      fs.writeFile(`${__dirname.replace("\\routes","")}/public${doc.content}/${chapter_name}.txt`, req.body.content,
        err => {
          if (err) {
            console.log(err);
          }
        });

      doc.save();
      res.json({
        msg: "chapter add to book"
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });

}

export function updateChapterByID(req, res, author, next){
  
  if (!req.body.book_id) {
    res.json({
      error: "book id is a required feild"
    });
    return;
  }
  if (!req.body.chapter_name) {
    res.json({
      error: "chapter_name is a required feild"
    });
    return;
  }
  if (!re.body.content) {
    res.json({
      error: "content is a required feild"
    });
    return;
  }

  Book.findById(req.body.book_id)
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access denied"
        });
        return;
      }

      let flag = false;
      
      for (let index = 0; index < doc.chapters.length; index++) {
        const element = doc.chapters[index];
        if (element.toLowerCase() == req.body.chapter_name.toLowerCase()) {
          flag = true;
        }
      }
      if(flag) {
        let chapter_name = space_to_dash(req.body.chapter_name.toLowerCase());
        fs.writeFile(`${__dirname.replace("\\routes","")}/public${doc.content}/${chapter_name}.txt`, req.body.content,
          err => {
            if (err) {
              console.log(err);
            }
          });
  
        doc.save();
        res.json({
          msg: "chapter updated to book"
        });
      }else{
        res.json({error:"chapter not in book"});
      }
      
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });
}

export function addChapterByName(req, res, author, next) {
  
  if (!req.body.book_name) {
    res.json({
      error: "book name is a required feild"
    });
    return;
  }
  if (!req.body.chapter_name) {
    res.json({
      error: "chapter_name is a required feild"
    });
    return;
  }
  if (!req.body.content) {
    res.json({
      error: "content is a required feild"
    });
    return;
  }

  Book.findOne({
      title: req.body.book_name
    })
    .then(doc => {
      if (!doc) {
        res.json({
          error: "book not found"
        });
        return;
      }
      if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access denied"
        });
        return;
      }
      for (let index = 0; index < doc.chapters.length; index++) {
        const element = doc.chapters[index];
        if (element == req.body.chapter_name) {
          res.json({
            error: "chapter name already taken"
          });
          return;
        }
      }
      doc.chapters.push(req.body.chapter_name);
      doc.latest_chapter += 1;
      let chapter_name = space_to_dash(req.body.chapter_name.toLowerCase());
      fs.writeFile(`${__dirname.replace("\\routes","")}/public${doc.content}/${chapter_name}.txt`, req.body.content,
        err => {
          if (err) {
            console.log(err);
          }
        });

      doc.save();
      res.json({
        msg: "chapter add to book"
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      });
    });

}



export function deleteChapter(req, res, author, next){
  let chapter_name = dash_to_space(req.params.chapter_name.toLowerCase());
  console.log(chapter_name);
  Book.findById(req.params.id)
  .then(doc => {
    if(!doc){res.json({error:"no book with provided id"});return;}
    if(doc.author_detail.id != author._id){res.json({error:"asscess denied"});return;}
    let found = false;
    for (let index = 0; index < doc.chapters.length; index++) {
      if(doc.chapters[index].toLowerCase() == chapter_name){
        doc.chapters.splice(index, 1);
        found = true;
        break;
      }
    }
 
    if(found){
      console.log(`${dash_to_space(chapter_name)}.txt`);
      fs.unlink(`${__dirname.replace("\\routes","")}/public${doc.content}/${space_to_dash(chapter_name)}.txt`,err => {
        console.log(err);
      });
      doc.latest_chapter --;
      // console.log(doc);
      doc.save(); 
      res.json({msg: 'Successfully deleted chapter'});
    } else {
      res.json({error:"no chapter with provided name"});
    }
    
  })
  .catch(err=>{
    console.log(err);
    res.json({error:err});
  });
}



/* delete a book. */
export function deleteBook(req, res, author, next) {


  Book.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        res.json({
          error: "no book with provided id"
        });
        return;
      } else if (!doc.author_detail.id.equals(author._id)) {
        res.json({
          error: "access not allowed"
        });
        return;
      }

      delete_data_of_book(doc);

      Book.deleteOne({
          _id: req.params.id
        })
        .then(msg => {
          if (msg.n == 1) {
            res.json({
              msg: "book deleted sucessfuly"
            });
          } else {
            res.json({
              error: "book could not be deleted"
            });
          }

        })
        .catch(err => {
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


export function delete_data_of_book(doc) {
  const title = space_to_dash(doc.title);
  fs.readdir(`${__dirname.replace("\\routes","")}/public/books_content/${title}`,
    (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      var length = files.length;
      var item_processed = 0;
      if (files.length == 0) {
        fs.rmdir(`${__dirname.replace("\\routes","")}/public/books_content/${title}`, err => {
          if (err) {
            console.log(err);
            return;
          }
        });
      } else {
        files.forEach(file => {
          fs.unlink(`${__dirname.replace("\\routes","")}/public/books_content/${title}/${file}`, err => {
            if (err) {
              console.log(err);
              return;
            }
            item_processed++;
            if (item_processed == length) {
              when_delete_forloop_done(doc);
            }
          });
        });
      }

    });

  fs.unlink(`${__dirname.replace("\\routes","")}/public${doc.img}`,
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("file deleted: ", `${__dirname.replace("\\routes","")}/public${doc.img}`);
    });
}

export function when_delete_forloop_done(doc) {
  const title = space_to_dash(doc.title);
  fs.rmdir(`${__dirname.replace("\\routes","")}/public/books_content/${title}`,
    err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("director deleted: ", `${__dirname.replace("\\routes","")}/public/books_content/${title}`);
    });

}

function space_to_dash(str) {
  return str.trim().replace(/\s+/g, "_");
}

function dash_to_space(str) {
  return str.trim().replace(/_+/g, " ");
}
exports.delete_data_of_book = delete_data_of_book;