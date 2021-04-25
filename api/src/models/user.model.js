// name, email, phone,password,discount level, username, status,
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const  validator = require('validator')

// create user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    phone:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('egyption mobile needed')
        }
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    userName:{
        type:String,
        unique:true
    },
    status:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        ref: 'UserTypes'
    },
    tokens:[
        {
            token:{type:String, trim:true}
        }
    ]
})


userSchema.pre('save', async function(next){
    user = this
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)
    next()
})

userSchema.statics.findByCredintials = async(email, password)=>{
    
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')

    if(!user.status) throw new Error('please activate your account')

    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass) throw new Error('invalid password')
        
    return user
}
userSchema.methods.generateToken = async function (){
    const user=this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWTSECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User',userSchema)
module.exports = User