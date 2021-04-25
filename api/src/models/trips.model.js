/*const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  stops:[{
   stop:{ type:mongoose.Schema.Types.ObjectId,
    ref:'Stop',
    required:true}

}],
train:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Train',
    required:true
},
startTime:{
  type:Nummber,
  required:true

},endTime:{
    type:Nummber,
    required:true
 }
})


const TripModel = mongoose.model('Trip',tripSchema)
module.exports = TripModel*/