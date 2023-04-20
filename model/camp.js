import mongoose from 'mongoose';
import Joi from 'joi'

const campSchema={
     cadet_regimentNo:{
        type:String,
        required:true
     },
      cadet_name:{
        type:String,
        required:true
      },
      camp_name:{
        type:String,
        required:true
      },
      camp_place:{
        type:String,
        required:true
      },
      date:{
        type:Object,
        default:[]
      },
      
      camp_type:{
        type:String,
        required:true,
        enum:['National','State']
      },
      imageName:{
        type:String,
      },
      campImages:[{
        type:Object,
        default:[]
      }] ,
      status:{
        type:Boolean,default:true
      }
      
}


const Camp=mongoose.model('Camp',campSchema)

const validateCamp=(camp)=>{
  const schema=Joi.object({
    cadet_regimentNo:Joi.string(),
    cadet_name:Joi.string(),
    camp_name:Joi.string().required(),
    camp_place:Joi.string().required(),
    camp_type:Joi.string().required(),
    
  }).options({ allowUnknown: true });

  return schema.validate(camp)
}

export {validateCamp}
export default Camp