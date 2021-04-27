const plan = require('../models/Plans');

class PlansRepository {
    constructor( PlansModel ){
        this.plan = PlansModel;
    }

    createPlan = async (plan) => {
        
        try {
            const { name, price, foto, video, dayUse, description } = plan
            const findPlan = await this.plan.findOne({name})
            if(findPlan){
                throw new Error();
            } else {
                const newPlan = await this.plan.create({ name, price, foto, video, dayUse, description })
                return ({
                    name: newPlan.name,
                    price: newPlan.price,
                    foto: newPlan.foto,
                    video: newPlan.video,
                    dayUse: newPlan.dayUse,
                    plan_id: newPlan._id,
                    description: newPlan.description
                })    
            }
       
        } catch (error) {
            throw new Error(error);
        }
    
    }

    getPlan = async (id) => {
        try {
            const planBD = await this.plan.find()
            return planBD
        } catch (error) {
            throw new Error(error);            
        }
    }

    editPlan = async (id, plan) => {
        try {
            const { name, price, foto, video, dayUse, description } = plan;
            const editedPlan = await this.plan.findByIdAndUpdate (id, { name, price, foto, video, dayUse, description }, {new : true});
            return ({
                name: editedPlan.name,
                price: editedPlan.price,
                foto: editedPlan.foto,
                video: editedPlan.video,
                dayUse: editedPlan.dayUse,
                description: editedPlan.description
                })
        } catch (error) {
            throw new Error(error);
            
        }
     }

     
}

module.exports = new PlansRepository(plan)