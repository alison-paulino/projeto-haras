const RefPlanHorse = require('../models/RefPlanHorse');

class RefPlanHorseRepositoty {
    constructor(refPlanHorseModel){
           this.refPlanHorse = refPlanHorseModel; 
    }

    apadrinhar = async (ids)=>{
        try {
            const { horse_id, plans_id, sponsor_id} = ids
            const refPlanHorse = await this.refPlanHorse.create({horse_id, plans_id, sponsor_id })
            return (refPlanHorse)
        } catch (error) {
            throw new Error();
        }
        
    }

    listHorse = async ()=>{
        try {
          const listHorsesDB = await this.refPlanHorse.find({})
          console.log(listHorsesDB.horse_id);
          return(listHorsesDB)
        } catch (error) {
            throw new Error();
        }
    }
    
}
module.exports = new RefPlanHorseRepositoty(RefPlanHorse);