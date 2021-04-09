const RefPlanHorseDao = require('../repository/refPlanHorse.dao');
const { Router } = require('express');

const routerRef = Router();

routerRef.post('/tosponsor', async (req, res)=>{
    try {
        const { horse_id, plans_id, sponsor_id} = req.body
       const refPlanHorse = RefPlanHorseDao.apadrinhar(req.body);
        res.status(200).json(refPlanHorse)
    } catch (error) {
        res.status(500).json({message: "erro ao criar RefPlanHorse"})
    }
})


module.exports = routerRef;