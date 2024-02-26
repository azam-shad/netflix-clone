const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (user_id) => {

    if (!process.env.SECRET) {
        console.error("SECRET environment variable is not set");
        throw new Error("SECRET environment variable is not set");
    }
    // console.log(user_id);
    // console.log('SECRET:', process.env.SECRET);
    const payload = { user: user_id };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1hr' })
}

module.exports = jwtGenerator;