const horseDao = require('../repository/horse.dao')
const { Router } = require('express');
const fileUploader = require('../config/cloudinary.config');


const routerHorse = Router();

routerHorse.post('/create', async (req, res)=>{
    try {
        const { name, affiliation, color, age, behavior, breed, imageUrl, register }= req.body
        if( !name && !affiliation && !color && !age && !behavior && !breed && !imageUrl && !register){
             return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const horse = await horseDao.registerHorse(req.body);
        res.status(200).json(horse)
    } catch (error) {
          res.status(500).json({message:'Erro ao criar novo cavalo'})
    }
})

routerHorse.get('/update/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const horse = await horseDao.findHorseById(id)
        res.status(200).json({
            name: horse.name,
            affiliation: horse.affiliation,
            color: horse.color,
            age: horse.age,
            behavior: horse.behavior,
            breed: horse.breed,
            imageUrl: horse.imageUrl
        })
    } catch (error) {
        res.status(400).json()
    }
})
routerHorse.put('/update/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const { name, affiliation, color, age, behavior, breed, imageUrl } = req.body
        if( !name && !affiliation && !color && !age && !behavior && !breed && !imageUrl ){
             return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }
        const horse = await horseDao.updateHorse(req.body, id);
        res.status(201).json(
                    {name: horse.name,
                    affiliation: horse.affiliation,
                    color: horse.color,
                    age: horse.age,
                    behavior: horse.behavior,
                    breed: horse.breed,
                    imageUrl: horse.imageUrl})
    } catch (error) {
        res.status(500).json({message:'Erro ao alterar um cavalo'})
    }    
})
routerHorse.post('/sendImg/:id', fileUploader.single('image'), async (req, res) =>{
    try {
        const { id } = req.params;
        const updatedHorse = await horseDao.insertImg(id, req.file.path)
        return res.status(201).json(updatedHorse)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar foto do cavalo'})
        
    }
})

routerHorse.get('/listhorse', async (req, res)=>{
    try {
        console.log('rota listHorse')
        const listedHorse = await horseDao.findHorse()
        return(res.status(200).json(listedHorse))
    } catch (error) {
        res.status(500).json({message:'Erro ao buscar cavalos'})
    }
})
routerHorse.get('/infohorse/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const horseInfo = await horseDao.findHorseById(id)
        res.status(200).json({
            name: horseInfo.name,
            affiliation: horseInfo.affiliation,
            color: horseInfo.color,
            age: horseInfo.age,
            behavior: horseInfo.behavior,
            breed: horseInfo.breed,
            imageUrl: horseInfo.imageUrl
        })
    } catch (error) {
        res.status(500).json({message:'Erro no servidor!'})
    }
})

routerHorse.post('/sendVideo/:id', fileUploader.single('video'), async (req, res) =>{
    try {
        const { id } = req.params;
        const updatedHorse = await horseDao.insertVideo(id, req.file.path)
        return res.status(201).json(updatedHorse)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar vídeo do cavalo' })    
    }

}) 


module.exports = routerHorse;