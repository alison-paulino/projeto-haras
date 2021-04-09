const bcrypt = require('bcryptjs');
const horseDao = require('../repository/horse.dao')
const { Router } = require('express');

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
        console.log(id);
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

module.exports = routerHorse;