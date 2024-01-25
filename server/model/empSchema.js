const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    emp_id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    technology: {
        type: String,
        require: true,
    }
})

const employee = mongoose.model('EMPLOYEE', empSchema);
module.exports = employee;