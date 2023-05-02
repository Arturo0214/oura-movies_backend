const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if(!email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }
    //comparamos el hash del password y el usuario
    if(admin && (await bcrypt.compare(password, admin.password))){
      res.status(200).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id)
        })
    } else {
    res.status(400)
    throw new Error('Credenciales incorrectas')
    }
})
const registerAdmin = asyncHandler (async (req, res) => {
    //desestructuramos el body request
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }
    //verificamos que recibamos la informacion que el modelo Admin necesita
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error('Este email ya fue registrado, el admin ya existe')
    }
    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //creamos el usuario
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })
    //mandamos la respuesta de la funcion
    if(admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email
    })
    } else {
        res.status(400)
        throw new Error('No se pudo crear el admin, datos incorrectos')
    }
})

const getMyData = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id)

    if (admin) {
      res.status(200).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email
      })
    } else {
      res.status(404).json({ message: 'Admin not found' })
    }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn: '30d'
  })
}

module.exports = { 
  loginAdmin, 
  registerAdmin, 
  getMyData 
}