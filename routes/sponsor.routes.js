const RefPlanHorseDao = require('../repository/refPlanHorse.dao');
const { Router } = require('express');

routerRefPlanHorse = Router();

routerRefPlanHorse.get('/listHorses', async (req, res )=>{
    try {
        const horses = await RefPlanHorseDao.listHorse()
        res.status(200).json(horses)
    } catch (error) {
        res.status(400).json({message: 'nenhum cavalo encontrado'})
    }
})

module.exports = routerRefPlanHorse;