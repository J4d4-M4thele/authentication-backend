const jwt = require('jsonwebtoken');

// //authentication middleware
// exports.requireLogin = (req, res) => {
//     try {
//         if (req.headers.authorization) {
//             const token = req.headers.authorization.split(' ')[1];
//             //verifying token
//             const decode = jwt.verify(token, process.env.JWT_SECRET);
//             //attach token to request
//             req.user = decode;
//             next();
//         } else {
//             return res.status(400).json({ message: 'Unauthorized' })
//         }
//     } catch (err) {
//         console.log('Something went wrong')
//     }
// };

// Authentication middleware
exports.requireLogin = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            //for debugging and converting timestamp
            const issuedAt = new Date(decode.iat * 1000); // Multiply by 1000 to convert to milliseconds
            const expiration = new Date(decode.exp * 1000);

            //timestamp
            console.log("Issued at:", issuedAt);
            console.log("Expiration:", expiration);

            req.user = decode;
            next();
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (err) {
        console.log("Authentication error:", err);
        return res.status(401).json({ error: "Unauthorized" });
    }
};