import {getAllBook,getBook,getBookbyTitle,getChapter,getAuthorBook,searchBookByTag,searchBookByTitle} from  './book.fun';
import {getAllAuthor,getAuthorByID,getAuthorByName,searchAuthorByName} from './author.fun';

var express = require('express');
var router = express.Router();

/* get all books . */
router.get('/book',     (req,res,next) => getAllBook(req,res,next));

/* get specific book by id. */
router.get('/book/:id',     (req,res,next) => getBook(req, res, next));

/* get specific book by title. */
router.get('/book/title/:name', (req,res,next) => getBookbyTitle(req, res, next));

/* get specific books of author. */
router.get('/book/author/:id', (req,res,next) => getAuthorBook(req, res, next));

/* get a chapter. */
router.get('/book/:id/:chapter_name', (req,res,next) => getChapter(req, res, req.author, next));

/* seacrh book by title */
router.post('/book/search/title', (req,res,next) => searchBookByTitle(req,res,next));

/* seacrh book by author */
// router.post('/book/search/author', (req,res,next) => searchBookByAuthor(rew,res,next));

/* seacrh book by tag */
router.post('/book/search/tag', (req,res,next) => searchBookByTag(req,res,next));

/* get all books sorted by title */
// router.get('/book/sort/title', (req,res,next) => sortBookByTitle(rew,res,next));

/* get all books sorted by title */
// router.get('/book/sort/date', (req,res,next) => sortBookByDate(rew,res,next));

/* get all books sorted by title */
// router.get('/book/sort/rating', (req,res,next) => sortBookByRating(rew,res,next));


//------------------------------------------------------------------------------------------------------//


/* get all author . */
router.get('/author', (req,res,next) => getAllAuthor(req, res, next));

/* get specific author data. */
router.get('/author/:id', (req,res,next) => getAuthorByID(req, res, next));

/* get specific Author name. */
router.get('/author/name/:name', (req,res,next) => getAuthorByName(req, res, next));

/* seacrh author by name */
router.post('/author/search/name', (req,res,next) => searchAuthorByName(req,res,next));

/* get all authors sorted by date */
// router.get('/author/sort/date', (req,res,next) => sortAuthorByDate(rew,res,next));

/* get all auhtor sorted by name */
// router.get('/author/sort/name', (req,res,next) => sortAuthorByName(rew,res,next));


export default router;
// module.exports = router;