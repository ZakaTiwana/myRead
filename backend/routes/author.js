import {Router} from 'express' ;
var router = Router();
// var upload = require('./book.fun').upload;

import {postBook,deleteBook,updateBookByID,updateBookByName,
        addChapterByID,addChapterByName,updateChapterByID,deleteChapter,
        updateImg,rateBook,upload}       from "./book.fun";

import {deleteAuthor,updateAuthor} from "./author.fun";





/* author add a book. */
router.post('/book', (req,res,next) => postBook(req, res, req.author ,next));

/* author delete a book. */
router.delete('/book/:id', (req,res,next) => deleteBook(req, res, req.author ,next));

/* author update a book. */
router.put('/book/id', (req,res,next) => updateBookByID(req, res, req.author ,next));

/* author update a book. */
router.put('/book/name', (req,res,next) => updateBookByName(req, res, req.author ,next));

//---------------------------------------------------

/* author rate book a book. */
router.post('/book/rate/:id', (req,res,next) => rateBook(req, res, req.author ,next));


//---------------------------------------------------

/* add a chapter. */
router.post('/ch/id', (req,res,next) => addChapterByID(req, res, req.author, next));

/* add a chapter. */
router.post('/ch/name', (req,res,next) => addChapterByName(req, res, req.author, next));

/* delete a chapter. */
router.delete('/ch/:id/:chapter_name', (req,res,next) => deleteChapter(req, res, req.author, next));

/* update a chapter. */
router.put('/ch/id', (req,res,next) => updateChapterByID (req, res, req.author , next));

//----------------------------------------------------

/* update cover img of book. */
// to send file use enctype="multipart/form-data" in form, and "img" is the name of the file input tag
router.put('/img/:id', upload.single("img"),(req,res,next) => updateImg(req, res, req.author ,next));
//----------------------------------------------------

/* delete author. */
router.delete('/', (req,res,next) => deleteAuthor(req, res, req.author ,next));

/* update author. */
router.put('/', (req,res,next) => updateAuthor(req, res, req.author ,next));

export default router;
// module.exports = router;