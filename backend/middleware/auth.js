const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        const token = req.header.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;

        if (req.body.userId && req.body.userId !== userId){
            throw 'invalid user ID';
        }else {
            next();
        }

    } catch {
        res.json({error: new Error('invalid request')});
    }
    
};