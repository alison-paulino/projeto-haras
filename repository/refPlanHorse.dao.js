const RefPlanHorse = require('../models/RefPlanHorse');
const Sponsor = require('../models/Sponsor');
const Horse = require('../models/Horse');

class RefPlanHorseRepositoty {
    constructor(refPlanHorseModel){
           this.refPlanHorse = refPlanHorseModel; 
    }

    apadrinhar = async (ids)=>{
        try {
            const { horse_id, plans_id, sponsor_id} = ids
            const refPlanHorse = await this.refPlanHorse.create(
                {horse_id, plans_id, sponsor_id })
                const refPlanHorse_id = refPlanHorse._id; 
                try {
                const SponsorInsertId = await Sponsor.findByIdAndUpdate(sponsor_id,{refPlanHorse_id}, {new : true})
                } catch (error) {
                    throw new Error();
                } 
                    try {
                        const HorseInsertId = await Horse.findByIdAndUpdate(horse_id,{refPlanHorse_id}, {new : true})
                        
                    } catch (error) {
                        throw new Error();
                    }
                
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