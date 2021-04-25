const express= require('express')
const User = require('../models/user.model')
const auth = require('../middleware/auth')
var nodemailer = require('nodemailer');
const router = new express.Router()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });
  


router.post('/user/register', async (req,res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        //SEND ACTIVATON OTP, SEND EMAIL


        
        var mailOptions = {
            from: '',
            to: user.email,
            subject: 'activation mail',
           text: `please follow the following link to activate your account :\n http://localhost:3000/user/activate/${user._id}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });






        res.status(200).send({
            apiStatus:true,
            data:{user},
            message:'user added'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatue:false,
            data: e.message,
            message:"error in add new user"
        })
    }
})

router.get('/user/activate/:id', async(req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findById({_id})
        if(!user) throw new Error('invalid user id')
        user.status = true
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: {user},
            message:'activated'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message:'error activating'
        })
    }
})

router.get('/user/deactivate/:id',auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findById({_id})
        if(!user) throw new Error('invalid user id')
        user.status = false
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: {user},
            message:'activated'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data: e.message,
            message:'error activating'
        })
    }
})

router.post('/user/login', async(req,res)=>{
    try{
        const user = await User.findByCredintials(req.body.email, req.body.password) 
        const token = await user.generateToken()       
        res.status(200).send({
        apiStatus:true,
        data: {user, token},
        message:'activated'
    })
}
catch(e){
    res.status(500).send({
        apiStatus:false,
        data: e.message,
        message:'error activating'
    })
}

})
router.patch('/user/profile',auth, async(req,res)=>{
    try{
    reqEdits = Object.keys(req.body)
    allowed = ['name', 'password']
    isValidUpdates = reqEdits.every(r=> allowed.includes(r))
    if(!isValidUpdates) throw new Error('invalid updates')
    reqEdits.forEach(r => {
    req.user[r] = req.body[r]       
    });
    await req.user.save()
    res.send('edited')
    }
    catch(e){

    }
})
module.exports=router