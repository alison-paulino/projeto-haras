const Horse = require('../models/Horse');
const bcrypt = require('bcryptjs');

class HorseRepository{

    constructor(HorseModel){
        this.horse = HorseModel;
    }
    registerHorse = async (horse)=>{
        try {
            const { name, affiliation, color, age, behavior, breed, imageUrl, register }= horse

            const horseDB = await this.horse.findOne({register})
            if(horseDB){
                throw new Error();
            }else{
                
                const newHorse = await this.horse.create(
                    {name, affiliation, color, age, behavior, breed, imageUrl, register})
                return ({
                    name: newHorse.name,
                    affiliation : newHorse.affiliation,
                    color: newHorse.color,
                    age: newHorse.age,
                    behavior: newHorse.behavior,
                    breed: newHorse.breed,
                    imageUrl: newHorse.imageUrl,
                    register: newHorse.register,
                    _id: newHorse._id
                })
            }
        } catch (error) {
            throw new Error();
        }

    }
    updateHorse = async (horse, id) =>{
        try {
            const { name, affiliation, color, age, behavior, breed, imageUrl }= horse
            const updatedHorse = await this.horse.findByIdAndUpdate(
                id,{ name, affiliation, color, age, behavior, breed, imageUrl }, {new : true})
                return(updatedHorse)
        } catch (error) {
            throw new Error();
        }
    }
    findHorseById = async (id)=>{
        try {
            const horseDB = await this.horse.findById(id)
            return(horseDB)
        } catch (error) {
            throw new Error();
        } 
    }
}
module.exports = new HorseRepository(Horse)