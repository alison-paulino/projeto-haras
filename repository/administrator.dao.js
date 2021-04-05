const Administrator = require('../models/Administrator');
const bcrypt = require("bcryptjs"); 

class AdminitratorRepository{

    constructor(AdministratorModel){
        this.administrator = AdministratorModel;
    }

    register = async (administrator) => {
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
             throw new Error();
        }
    }
} 
module.exports = new AdminitratorRepository(Administrator);