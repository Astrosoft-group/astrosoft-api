const bcrypt = require('bcryptjs')

module.exports = (user)=>{
    user.addHook('beforeCreate',async function(user,options){
         try {
            const hashedPassword = await bcrypt.hash(user.password,12)
            user.password = hashedPassword
         } catch (error) {
            throw error
         }
    });

}