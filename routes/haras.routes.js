const { Router } = require('express');
const harasDao = require('../repository/haras.dao')

const harasRouter = Router();

harasRouter.post('/create', async (req, res) => {
    try {
        
        const {name, phone, email, localization } = req.body;

        if( !name && !phone && !email && !localization ){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }    
        const haras = await harasDao.createHaras(req.body)
        res.status(201).json(haras)
          
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar haras'})
        
    }
})

harasRouter.get('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const haras = await harasDao.getHaras(id)
        res.status(200).json(haras)

    } catch (error) {
        throw new Error(error)        
    }

})


harasRouter.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, phone, email, localization } = req.body
        if (!name && !phone && !email && !localization){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'})
        }

        const editedHaras = await harasDao.editHaras(id, req.body);
        return res.status(201).json(editedHaras)

    } catch (error) {
        res.status(500).json({message: 'Haras não encontrado'})
    }
}) 



module.exports = harasRouter