const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');
const Employee = require('../model/empSchema');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

router.use(cookieParser());
const authenticate = require('../middleware/authenticate');
const EmpAuthenticate = require('../middleware/empAuthenticate')

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

// Logout 
router.get('/logout', (req, res) => {
    console.log('Logout call');
    res.clearCookie('jwttoken', { path: '/' });
    res.status(200).send('Logout Succesfully...');
})

// Update Existing User 
router.post('/update', authenticate, async (req, res) => {
    try {
        const { name, phone, work } = req.body;
        const result = await User.findByIdAndUpdate({ _id: req.userID }, {
            $set: {// "phone": "9876543210", 
                name, phone, work
            }
        });
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send(err)
    }
})

// Delete user 
router.get('/delete', authenticate, async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: req.userID });
        console.log(deleteUser);
        res.status(200).send(deleteUser);
    } catch (err) {
        res.status(404).send(err);
    }
})

// employee data
// router.get('/employee', async (req, res) => {
//     try {
//         Employee.find({ _id: req.userID })
//         .exec((err, results) => {
//             if (err) {
//               console.error('err');
//               return;
//             }
//             console.log('results');
//         });
//     } catch (err) {
//         console.log('err');
//     }
//     //    console.log(req.body);
//     // const { emp_id, name, position, technology, email } = req.body;
//     // if (!emp_id || !name || !position || !technology || !email) {
//     //     res.status(400).send('Fill the blank feild...');
//     // }
//     // try {
//     //     const emp_Exit = await EmployeeData.findOne({ email: email })
//     //     const empIdExist = await EmployeeData.findOne({ emp_id: emp_id })
//     //     if (emp_Exit || empIdExist) {
//     //         return res.status(422).json({ Error: 'Email or Employee Id already Exist, Choose other one.' });
//     //     }
//     //     const Employee = new EmployeeData({ emp_id, name, position, technology, email });
//     //     await Employee.save();
//     //     res.status(200).json({ Message: `User Registration Successfully...` });

//     // } catch (err) {
//     //     console.log(err)
//     // }

// });
router.get('/employee', async (req, res) => {
    try {
        const allEmployees = await Employee.find({});
        res.json(allEmployees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add new Employee 
router.post('/employee/addnew', async (req, res) => {

    const { emp_id, name, email, position, technology } = req.body;

    if (!emp_id || !name || !email || !position || !technology) {
        return res.status(422).json({ Error: 'Fill the empty property...!' });
    }
    try {
        const { emp_id, name, email, position, technology } = req.body;
        const idexit = await Employee.findOne({ emp_id: emp_id })
        const emailExit = await Employee.findOne({ email: email })

        if (idexit) { return res.status(422).json({ Error: 'Employee ID Already Exists, Choose other Employee id.' }); }
        if (emailExit) { return res.status(422).json({ Error: 'Email Already Exists, Choose other Email.' }); }

        const allEmployees = new Employee({ emp_id, name, email, position, technology })
        await allEmployees.save();

        res.status(200).json({ Message: `User Registration Successfully...` });

    } catch (err) {
        console.log(err.Message);
    }
})

// Employee delete 
router.delete('/employee/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Employee.findByIdAndDelete({ _id: id });
        // const result = await Employee.findByIdAndDelete(id);
        res.status(200).json({ Msg: 'Employee delete successfully...' });

        // const deleteEmp = await Employee.findByIdAndDelete("65a8e77fd3aeebad569cf67c");

    } catch (err) {
        res.status(404).send(err);
    }
});

// Update Existing Employee 
router.post('/employee/update/:id', async (req, res) => {
    try {
        const { emp_id, name, position, technology, email } = req.body;
        const id = req.params.id;
        const result = await Employee.findByIdAndUpdate({ _id: id }, {
            $set: {
                emp_id, name, position, technology, email
            }
        });
        console.log(result);
        return res.status(200).send(result);

    } catch (err) {
        res.status(404).send(err);
    }
})

module.exports = router;