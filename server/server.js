const dotenv = require('dotenv')
const express = require('express')
const app = express()

// Secure Username and Passord using env
dotenv.config({ path: './config.env' });
// const user = require('./model/userSchema');
require('./db/conn');

app.use(express.json());

const port = process.env.PORT;
// const middleware = (req, res, next) => {
//     console.log(`Hello MiddleWare`);
//     next();
// }

// Route Path 
app.use(require('./route/auth'));

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`))