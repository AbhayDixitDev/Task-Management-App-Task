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

const adminAuthorization = (req, res, next) => {
    const { username, password } = req.body;

    if (username !== 'Abhaydixitdev' || password !== 'Admin@12345') {
        return res.status(401).send({ message: 'Invalid Admin credentials' });
    }

    next();
};


module.exports = {authorization,adminAuthorization};