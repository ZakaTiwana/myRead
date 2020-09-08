import {Router} from 'express' ;
var router = Router();

import jwt from 'jsonwebtoken' ;
import passport from 'passport' ;
import  config   from "../config" ;

import {postAuthor} from "./author.fun";



/* POST login. */
router.post('/login', function (req, res, next) {
    console.log("here");
    passport.authenticate('local', {session: false}, (err, author, info) => {
        console.log(err);
        if (err || !author) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                author   : author
            });
        }

        req.login(author, {session: false, expiresIn: '180' }, (err) => {
            if (err) {
                res.send(err);
            }
            let new_author = {
                _id:        author._id,
                name:       author.name,
                joined:     author.joined,
                about_self: author.about_self
            };
            const token = jwt.sign(new_author ,config.secret);

            return res.json({author:new_author, token});
        });
    });

});

router.post("/register", (req,res,next)=>postAuthor(req,res,next));

// module.exports = router;
export default router;