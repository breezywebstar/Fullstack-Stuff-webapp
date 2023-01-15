const User = require('../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.signup = (req, res, next) =>{
bcrypt.hash(req.body.password, 10).then((hash) =>{
    const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save().then(() =>{
        res.json({message:'user added successfully'});
    }).catch ((error) =>{
        res.json({error: error});
    });
});

};

exports.login = (req,res, next) =>{
User.findOne({email: req.body.email}).then((user) =>{
    if (!user){
        return res.json({error: new Error('user not found')});
    }
    bcrypt.compare(req.body.password, user.password).then((valid) =>{
        if (!valid){
            return res.json({error: new Error('incorrect password')});
        }
        const token =jwt.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
        res.json({
            userId: user._id,
            token: token
        });

    }).catch((error) =>{
        res.json({error: error});
    })
}).catch((error) =>{
    res.json({error: error});
});
}
