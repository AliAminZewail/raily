const express = require('express')
const auth = require('../middleware/auth')
const RolesModel = require('../models/user-roles.model.js')
const PrivilegesModel = require('../models/privileges.model.js')

const router = new express.Router()

const success = function(data, msg){
    return {
        "apiStatus": true,
        "data": data,
        "message": msg
    }
}

const failed = function(error, msg){
    return {
        "apiStatus": false,
        "error": error.message,
        "message": msg
    }
}

router.get('/rolestypes/showall', async (req,res)=>{
    try{
        data = await RolesModel().find()
        res.status(200).send(success(data,'Data retrieved'))
    }catch(e){
        res.status(500).send(failed(e,'Failed to load data'))
    }
})

router.post('/rolestypes/add', async (req,res)=>{
    try{
        data = new RolesModel(req.body)
        await data.save()
        res.status(200).send(success(data,'Role addded'))
    }catch(e){
        res.status(500).send(failed(e,'Failed to add role'))
    }
})

router.post('/addroute', auth, async(req,res)=>{
    try{
        data = new PrivilegesModel({
            routeLink:req.body.routeLink,
            privilegedRoles:[req.user.role]
        })
        await data.save()
        res.status(200).send(success(data,'New route added'))
    }catch(e){
        res.status(500).send(failed(e,'Failed adding new route'))
    }
})

router.post('/giveaccess', auth, async(req,res)=>{
    try{
        data = await PrivilegesModel.findOne({'routeLink':req.body.route})
        data.privilegedRoles.push(req.body.role)
        await data.save()
        res.status(200).send(success(data,'Access added'))
    }catch(e){
        res.status(500).send(failed(e,'Failed to add access'))
    }
})
// try{
//     res.status(200).send(success(data,''))
// }catch(e){
//     res.status(500).send(failed(e,''))
// }

module.exports = router