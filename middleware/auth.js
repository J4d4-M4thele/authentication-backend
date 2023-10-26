const jwt = require('jsonwebtoken');

//authentication middleware
exports.requireLogin = (req, res)=> {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            //verifying token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //attach token to request
            req.user = decode;
            next();
        }else {
            return res.status(400).json({message: 'Unauthorized'})
        }
    } catch (err) {
        console.log('Something went wrong')
    }
}