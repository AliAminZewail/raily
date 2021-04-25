const express= require('express')
const Train = require('../models/train.model')
const router = new express.Router()

router.post('/train/add', async (req,res)=>{
    try{
        const train = new Train(req.body)
        await train.save()

        res.status(200).send({
            apiStatus:true,
            data:{train},
            message:'train added'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatue:false,
            data: e.message,
            message:"error"
        })
    }
})

router.get('/train/showAll', async (req,res)=>{
    try{
        const train =  await Train.find({});
        

        res.status(200).send({
            apiStatus:true,
            data:{train},
            message:'train added'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatue:false,
            data: e.message,
            message:"error"
        })
    }
})

module.exports=router