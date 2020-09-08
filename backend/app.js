import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import passport from "passport";
import cookieParser from "cookie-parser";
// var cors from "cors" ;
import cors from "cors";

import  indexRouter from './routes/index' ;
import allRouter from './routes/all' ;
import authorRouter from'./routes/author' ;
import auth from './routes/auth' ;

import mongoose from 'mongoose';
var app = express();


const connStr = 'mongodb://localhost:27017/books-by-any-for-all-2';

mongoose.connect(connStr,{ useNewUrlParser: true,useUnifiedTopology:true, }, function (err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});


// set jwt
import "./passport";


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( passport.initialize( {
  userProperty: 'author' // defaults to 'user' if omitted
}));
app.use(cors());


app.use('/', indexRouter);
app.use('/api', auth);
app.use('/api', allRouter);
app.use('/api/author', passport.authenticate('jwt', {session: false}), authorRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.all("*",function(req,res,next){
    console.log("");
    res.json({err:"404"});
});
module.exports = app;
