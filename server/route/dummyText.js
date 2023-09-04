//! Using proises (without Async) 
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ Error: 'Plz fill empty property...!' });
//     }
//     User.findOne({ email: email })
//         .then((UserExit) => {
//             if (UserExit) {
//                 return res.status(422).json({ Error: 'Email Already Exists, Choose other Email id.' });
//             }
//             if (password === cpassword) {
//                 const user = new User({ name, email, phone, work, password, cpassword })
//                 user.save()
//                     .then(() => {
//                         res.status(200).json({ Message: 'User Registion Successfully...!' })
//                     })
//                     .catch(err => res.status(500).json({ Message: 'Registion Failed...!' }));
//             } else {
//                 res.json({ Message: 'Password and Confirm Password are not same...' })
//             }
//         })
//         .catch(err => res.json({ Message: 'Registion Failed...!' }));
// })