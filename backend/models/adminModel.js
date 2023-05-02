const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Teclea un nombre']
    },
    email: {
        type: String,
        required:  [true, 'Teclea un email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea un password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)