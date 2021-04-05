const bcrypt = require('bcryptjs');
const administratorDao = require('../repository/administrator.dao')
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const routerAdm = Router();

routerAdm.post('/signup', async(req, res) =>{
    try {

        const { name, phone, email, age, imageUrl, password } = req.body

        if(!name && !phone && !email && !age && !imageUrl && !password){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const administrator = await administratorDao.register(req.body)
        res.status(201).json(administrator)
    } catch (error) {
        res.status(500).json({message:'Erro ao registrar novo administrador'})
    }
})

routerAdm.post('/login', async(req, res) =>{
    try {
        
        const { name, phone, email, age, imageUrl, password } = req.body
        const administrador = await administratorDao.findAdministrator(email)
        
        if(!administrador){
            return res.status(400).json({message:'Login não autorizado, entre com senha e email novamente'})
        } 
        const compareHash = bcrypt.compareSync(password, administrador.passwordHash)
      
        if(!compareHash){
             return res.status(400).json({message:'Login não autorizado, entre com senha e email novamente'})
        }
        const payload = {
            email: administrador.email,
            id: administrador._id
        };
        
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {expiresIn: '1day'}
        )
         res.status(200).json({ payload,token})
    } catch (error) {
        
        res.status(500).json();
    }
})
module.exports = routerAdm;