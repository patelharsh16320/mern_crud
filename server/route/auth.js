const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');
const User = require('../model/userSchema');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', (req, res) => {
    res.cookie('jwttoken', 'home');
    res.send('Home page from Router route...!');

})
// New User create 
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ Error: 'Fill the empty property...!' });
    }
    try {
        const { name, email, phone, work, password, cpassword } = req.body;
        if (password === cpassword) {
            const userExit = await User.findOne({ email: email })
            if (userExit) {
                return res.status(422).json({ Error: 'Email Already Exists, Choose other Email id.' });
            }
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save();
            res.status(200).json({ Message: `User Registration Successfully...` });
        }
        else {
            return res.status(422).json({ Error: 'Password & confirm password are not same, Fill the same data on both...' });
        }
    } catch (err) {
        console.log(err.Message);
    }
})
// Login Route 
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ Err: 'Plz fill the data...' });
        }
        // user matching with database 
        const userLogin = await User.findOne({ email: email });

        if (!userLogin) {
            res.status(400).json({ Err: "Invalid Credentials!..." })
        } else {
            // Password matching with username 
            const isMatch = await bcrypt.compare(password, userLogin.password);

            // create unic token 
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwttoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (isMatch) {
                res.status(200).json({ message: "User Login Successfully!..." })
            } else {
                res.status(400).json({ Err: "Login failed!..." })
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})
// about us 
router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// contact us 
router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json({ Error: "Filled the reaminig feild" });
        }
        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            
            res.status(201).json({ Message: "User contact successfully..." });
        }

    } catch (err) {
        res.send(err.message)
    }
});

module.exports = router;    