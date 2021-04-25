const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
    roleName:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

rolesSchema.virtual('privilegeAccess',{
    localField:'roleName',
    foreignField:'privilegedRoles',
    ref:'roles'
})

const RolesModel = mongoose.model('UserRoles', rolesSchema)

module.exports = RolesModel