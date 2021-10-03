const router = require("express").Router(),
    User = require("../models/User"),
    bcrypt = require('bcrypt'),
    config = require('../config'),  
    jwt = require('jsonwebtoken');


//register user
router.post("/register",  async (req, res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //creating new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
    
        });1
        //saving the user 
        const user = await newUser.save();
        const payload = {
            userId:user._id,
            email: user.email
        }
        jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            // console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
                expire: new Date() + 9999,                                        
              })
            res.status(200).json({ 
                token,
                user: {
                    name: user.username,
                    email: user.email,
                }
            });
        })
    } catch (err) {
        res.status(500).json(err);
    }

});

//login

router.post('/login', async (req, res) =>{
    try {
    const user = await User.findOne({email: req.body.email});
    !user && res.status(404).json("User not found.");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(404).json("Invalid Password.");
    const payload = {
        userId:user.id,
        email: user.email
    }
    jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' }, (err, token) => {
        res.cookie("token", token, {
            httpOnly:true,
            expire: new Date() + 9999
        })
        res.status(200).json({ 
            token,
            user: {
                name: user.username,
                email: user.email,                                      
            }
        });
    })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;