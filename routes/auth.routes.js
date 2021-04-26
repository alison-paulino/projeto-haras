const bcrypt = require('bcryptjs');
const administratorDao = require('../repository/administrator.dao')
const sponsorDao = require('../repository/sponsor.dao')
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const fileUploader = require('../config/cloudinary.config');

const routerAuth = Router();

routerAuth.post('/upload',fileUploader.single('image') ,async (req, res)=>{
    try {
       const fileUploaded = req.file.path
        return res.status(200).json(fileUploaded)
    } catch (error) {
        res.status(500).json({message:'Erro ao registrar novo administrador'})
    }
})

routerAuth.post('/signupAdm', async(req, res) =>{
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

routerAuth.post('/loginAdm', async(req, res) =>{
    try {

        const {  email, password } = req.body

        const administrador = await administratorDao.findAdministrator(email)
        
        if(!administrador){
            return res.status(400).json({message:'Login não autorizado, senha ou email incorreto'})
        } 
        const compareHash = bcrypt.compareSync(password, administrador.passwordHash)
        
        if(!compareHash){
          return res.status(400).json({message:'Login não autorizado, senha ou email incorreto'})
        }
        const payload = {
            email: administrador.email,
            id: administrador._id
            name: administrator.name,
            phone : administrator.phone,
            age: administrator.age,
            imageUrl: administrator.imageUrl
        };
        
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {expiresIn: '1 day'}
            )
            console.log('fim da rota')
         res.status(200).json({ payload, token })
    } catch (error) {
        
        res.status(500).json(error);
    }
})  

routerAuth.get('/adm/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const administrator = await administratorDao.findAdministratorById(id);
        res.status(200).json(administrator)
    } catch (error) {
        throw new Error();
    }
})
routerAuth.put('/updateAdm/:id',async (req, res) =>{
    try {
        const {id} = req.params
        const { name, phone, email, age, imageUrl, password } = req.body
        if(!name && !phone && !email && !age && !imageUrl && !password){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const administrator = await administratorDao.updateAdministrator(req.body,id)
        return res.status(201).json({administrator})
    } catch (error) {
        res.status(500).json({message:'Administrador não encontrado'})
    }
} )
routerAuth.post('/signup', async(req, res) =>{
    try {
        const { name, phone, email, age, imageUrl, password } = req.body

        if(!name && !phone && !email && !age && !imageUrl && !password){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const sponsor = await sponsorDao.register(req.body)
        res.status(201).json(sponsor)
       
    } catch (error) {
        res.status(500).json({message:'Erro ao registrar novo Patrocinador'})
    }
})
routerAuth.post('/login', async(req, res) =>{
    try {
        const { email, password} = req.body
        const sponsor = await sponsorDao.findSponsor(email)
        
        if(!sponsor){
            return res.status(400).json({message:'Login não autorizado, entre com senha e email novamente'})
        } 
        const compareHash = bcrypt.compareSync(password, sponsor.passwordHash)
      
        if(!compareHash){
             return res.status(400).json({message:'Login não autorizado, entre com senha e email novamente'})
        }
        const payload = {
            email: sponsor.email,
            id: sponsor._id,
            name: sponsor.name,
            phone : sponsor.phone,
            age: sponsor.age,
            imageUrl: sponsor.imageUrl,
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
    routerAuth.get('/sponsor/:id', async(req, res)=>{
        try {
            const {id} = req.params
            const sponsorDB = await sponsorDao.findSponsorById(id)
            return res.status(200).json(sponsorDB)
        } catch (error) {
            res.status(401).json({message:'Usuário não encontrado'})
        }
    })
    routerAuth.put('/updateSponsor/:id',async (req, res) =>{
    try {
        const {id} = req.params
        const { name, phone, email, age, imageUrl, password, message } = req.body
        if(!name && !phone && !email && !age && !imageUrl && !password){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const sponsor = await sponsorDao.updateSponsor(req.body,id)
        return res.status(201).json({sponsor})
    } catch (error) {
        res.status(500).json({message:'Patrocinador não encontrado'})
    }

})
module.exports = routerAuth;