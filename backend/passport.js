import  passport    from 'passport' ;
import  {ExtractJwt,Strategy as JWTStrategy} from "passport-jwt" ;
import  Author from "./models/author" ;

import bcrypt from 'bcrypt' ;
import config from "./config";

// const ExtractJWT = passportJWT.ExtractJwt;

import { Strategy as LocalStrategy } from 'passport-local';
// const LocalStrategy = require('passport-local').Strategy;
// const JWTStrategy   = passportJWT.Strategy;



passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},

function (name, password, cb) {
    return Author.findOne({
            name
        })
        .then(author => {
            console.log(author);
            bcrypt.compare(password, author.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return cb(null, author, {
                        message: 'Logged In Successfully'
                    });
                }
                return cb(null, false, {
                    message: 'Incorrect authorname or password.'
                });
            });

        })
        .catch(err => cb(err));
}
));


passport.use(new JWTStrategy({
    
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.secret
    },
    function (jwtPayload, cb) {
       
        return Author.findById(jwtPayload._id)
            .then(author => {
                return cb(null, author);
            })
            .catch(err => {
                return cb(err);
            });
    }
));