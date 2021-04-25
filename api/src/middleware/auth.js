const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const PrivilegesModel = require('../models/privileges.model.js')

const auth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        const user = await User.findOne({
            '_id': decoded._id,
            'token': token,
            'status': true
        })
        if(!user) throw new Error('Failed to log in')

        req.user = user
        req.token = token

        const data = await PrivilegesModel.findOne({'routeLink':req.originalUrl})
        if(data.privilegedRoles.includes(user.role))
            next()
        else throw new Error('Unauthoraized access')
    }catch(e){
        res.status(500).send({
            "apiStatus": false,
            "error": error.message,
            "message": 'Authorization failed'
        })
    }
}

module.exports = auth