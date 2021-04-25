const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
trainType:{
    type:String,
    trim:true,
    required:true
},
seats:{
  type:Number,
  required:true,
}
})

// userSchema.virtual('trainTrip', {
//     ref:'Trip',
//     localField: "_id",
//     foreignField:"train"
// })


const TrainModel = mongoose.model('Train',trainSchema)
module.exports = TrainModel