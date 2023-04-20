import cloudinary from '../utils/cloudinary1.js'
import fs from 'fs'


const imageUpload=async(path)=>{
    return await cloudinary.v2.uploader.upload(
        path,
        {
          public_id: `${Date.now()}`, 
          resource_type: "auto"
        },
        (err, result) => {
          if (err) return err
  
          fs.unlinkSync(path);
          
        }
      );
}


const deleteImageCloud=async(public_id)=>{
   return await cloudinary.v2.uploader.destroy(public_id)
}


export {imageUpload,deleteImageCloud} 