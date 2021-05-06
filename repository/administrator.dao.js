const Administrator = require('../models/Administrator');
const bcrypt = require("bcryptjs"); 

class AdminitratorRepository{

    constructor(AdministratorModel){
        this.administrator = AdministratorModel;
    }

    register = async (administrator) => {
        console.log('register')
        const { name, phone, age, email, password, imageUrl } = administrator;
        try {
            const administrator = await this.administrator.findOne({email}) 
            if(administrator){
                throw new Error();
            }else{
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const newAdministrator = await this.administrator.create({name, phone, age, email, imageUrl, passwordHash})
                return ({
                    name: newAdministrator.name,
                    phone : newAdministrator.phone,
                    age: newAdministrator.age,
                    email: newAdministrator.email,
                    imageUrl: newAdministrator.imageUrl
                })
            }
        } catch (error) {
            throw new Error();
        }
    }
    findAdministrator = async (email) =>{
        try {
            
            const administrator = await this.administrator.findOne({email})
            return administrator
        } catch (error) {
             throw new Error(error);
        }
    }
    
    updateAdministrator = async (administrator, id)=>{
        try {
            const { name, phone, age, email, password, imageUrl } = administrator;
            const administratorDB = await this.administrator.findById(id) 
            if(!administratorDB){
                throw new Error();
            }else{
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const updatedAdministrator = await this.administrator.findByIdAndUpdate(
                    id,{name, phone, age, email, imageUrl, passwordHash},{new : true})
                return ({
                    name: updatedAdministrator.name,
                    phone : updatedAdministrator.phone,
                    age: updatedAdministrator.age,
                    email: updatedAdministrator.email,
                    imageUrl: updatedAdministrator.imageUrl,
                    
                })
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    getAdministrator = async () => {
        try {
           const administratorBD = await this.administrator.find()
        return administratorBD;
        } catch (error) {
            
            throw new Error();
        }
        
    }

    deleteAdmin = async (id) => {
        try {
            const administratorBD = await this.administrator.findByIdAndRemove(id)
            console.log(administratorBD)
            return administratorBD

        } catch (error) {
            throw new Error();
        }
    }
} 
module.exports = new AdminitratorRepository(Administrator);