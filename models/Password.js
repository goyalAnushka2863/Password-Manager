const mongoose = require('mongoose')
const passwordSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USer',
        required:true
    },
    website:{
        type:String,
        required:true, 
        match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, 'Invalid website URL']
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Password', passwordSchema)