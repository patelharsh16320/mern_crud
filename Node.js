//* To create new Node project 
// cmd: npm init
// function(export, require, module, __filename, __dirname) 

//* Give File Name 
console.log(__filename);
// give Directory name 
console.log(__dirname);


//////////////////////////////////////////
/////// Install Nodemon -> start ////////

//* in power cell (CMD) 
// Set-ExecutionPolicy Bypass -Scope Process

//* then in cmd 
// npm install --save-dev nodemon

//* to uninstall nodemon 
// npm uninstall nodemon

/////// Install Nodemon -> end ///////////
//////////////////////////////////////////

const fs = require('fs');

// create folder 
fs.mkdirSync('thapa');

// create file and add data on it 
// fs.writeFileSync('thapa/bio.txt',' Name: Harsh, Language: Node');

// add more data on it 
fs.appendFileSync('bio.txt','Other Language: React.js, Next.js');

// read data without buffer of it 
const buffbuffer_dataer_data = fs.readFileSync('bio.txt');
const data = buffer_data.toString();
console.log(data);

// rename file name 
fs.renameSync('thapa/bio.txt', 'thapa/mybio.txt');

// delete file and folder in node js?
    // for file
        fs.unlinkSync('thapa/mybio.txt');
    // for folder 
        fs.rmdirSync('thapa');


const path = require("path");
console.log(path.parse('d:\Harsh\Learning\Node Js\Node.js'));

//* designing 
// npm init 
// npm i chalk 

// to change default path 
const path = require('path');
// After path 
// D:\Harsh\Learning\Node Js\Expessjs\Server\src\

const staticPath = path.join(__dirname, '../public');
// Before Pate 
// D:\Harsh\Learning\Node Js\Expessjs\Server\public\ 
// Built in MiddleWare
app.use(express.static(staticPath));

// Home Path
app.get('/', (req, res) => {
    res.sendFile(staticPath + '/home.html');
});

//* css border for png shape 
// figure {
//     img.img-fluid {
//         filter: drop-shadow(0 0.5rem 1rem var(--main-bg));
//     }
// }

//* node refresh at any changes on js and hbd 
// nodemon server.js -e js,hbs

//! hashing 
//? bcrypt.hash -> For Encript
//? bcrypt.compare -> For Decript

//* hashing the password
//? bcrypt.hash 
const bcrypt = require('bcrypt'); 
userSchema.pre('save', async function (next) {
    // console.log('Hlo from inside...');

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})
//* decrept hasing password and compare with username save in "userlogin"
//? bcrypt.compare 
const userLogin = await User.findOne({ email: email });
const isPass = await bcrypt.compare(password, userLogin.password);

//! create database 
// const userSchema = mongoose.schema -> Create Database
// userSchema.pre -> Before save the data in database it work(user.save().then()...)
    //* token create 
    //? npm i jsonwebtoken -> cmd
    // allData.generateAuthToken() -> all data store in allData and create token('id')
// userSchema.methods.generateAuthToken -> get token 

// create cookie 
res.cookie('jwtCookie', token, {
    expires:new Date(date.now() + 2629800 ) , // 2629800 = 1 month
    httpOnly: true
});

//* css import in React js 
// import 'bootstrap/dist/css/bootstrap.css'