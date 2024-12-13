const jwt = require('jsonwebtoken');


const authorization = (req, res, next) => {
    const token = req.cookies.access_token; 
    if (!token) {
        return res.sendStatus(403); 
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next(); 
    } catch {
        return res.sendStatus(403); 
    }
};

module.exports = authorization;