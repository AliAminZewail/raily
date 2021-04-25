const express= require('express')
const Stop = require('../models/stop.model')
const router = new express.Router()

router.post('/stop/add', async (req,res)=>{
    try{
        const stop = new Stop(req.body)
        await stop.save()

        res.status(200).send({
            apiStatus:true,
            data:{stop},
            message:'stop added'
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

router.get('/stop/edit/:id', async (req,res)=>{
    try{
                const stop = await Stop.findOne({_id:req.params.id});
        console.log(stop);
        keys=Object.keys(req.body)
        keys.forEach(element => {
            stop[element]=req.body[element]
        });
        await stop.save()

        res.status(200).send({
            apiStatus:true,
            data:{stop},
            message:'edited'
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