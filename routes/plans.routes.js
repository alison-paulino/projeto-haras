const { Router } = require('express');
const plansDao = require('../repository/plans.dao');

const plansRouter = Router();

plansRouter.post('/create', async ( req, res ) => {
    try {
        const { name, price, foto, video, dayUse } = req.body;
            
        if( !name && !price && !foto && !video && !dayUse ){
            return res.status(400).json({ message: 'Todos os campos são obrigatórios'})
        }
        const plan = await plansDao.createPlan(req.body)
        res.status(201).json(plan) 
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar plano'})
    }
})

plansRouter.get('/list', async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await plansDao.getPlan();
        res.status(200).json(plan)

    } catch (error) {
        throw new Error(error)
    }
})   

plansRouter.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, foto, video, dayUse } = req.body;
        if( !name && !price && !foto && !video && !dayUse ){
            return res.status(400).json({ message: 'Todos os campos são obrigatórios'})
        } 
        const editedPlan = await plansDao.editPlan(id, req.body)
        return res.status(201).json(editedPlan)  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao editar plano' })
        
    }
})




module.exports = plansRouter;
