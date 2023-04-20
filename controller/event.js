import Event ,{validateEvent} from '../model/event.js'
import cloudinary from '../utils/cloudinary1.js'
import _ from 'lodash'
import { deleteImageCloud, imageUpload } from '../helpers/ImageUpload.js'

//Add new Event and joi validation
const addEvent=async(req,res)=>{
    
    try {
      let payload=req.body
      const {error}=validateEvent(req.body)
      if(error) return res.status(400).send(error.details[0].message)

        

     
     
          let addData=await Event.create(payload)
          res.json({
            message:"Event created successfully",
            data: addData,
            status:res.statusCode
          })

    } catch (error) {
    res.status(400).send(error.message)
    }
}

//view a single event using event_name
// const viewEvent=async(req,res)=>{
//     try {
//       let getDate=await Event.findOne({event_name:req.params.event_name})
//       const view=await Event.find({_id:getDate._id},{_id:0,__v:0})
//       res.send(view)
      
//     } catch (error) {
//       res.status(400).send(error.message)
//     }
//   }
 

//add profile image
const addEventImages=async(req,res)=>{
  try { 
  
    const files = req.files.files
    console.log(files);

    let finalArr=[]

    if(files.length > 0) {

      for (let i = 0; i < files.length; i++) {
        const {path} = files[i];
        let upload= await imageUpload(path)
        console.log("upload",upload);
        finalArr.push(upload)
      }

     
  
      if(finalArr.length > 0){
        res.json({
          message:"Event Images successfully added",
          data:finalArr,
          status:200
        })
      }
             

      
    }

    console.log("final",finalArr);

    finalArr=[]
    
 

  
    
 

  
  } catch (error) {
    return res.send({
      err:error.message,
      status:400
    })
  }
}

//view all the event
const allEvent=async(req,res)=>{
   let {match='{}'}=req.query

    try{
      const view=await Event.find(JSON.parse(match)).sort({event_date:-1})
      res.send(view)
  
    }catch(error){
      res.status(400).send(error.message)
    }
 
  }

//update event using event date

  const updateEvent=async(req,res)=>{

    try {
      let payload=req.body

      let {_id}=payload

     delete payload._id

     console.log("payload",payload);
     
        let fresult=await Event.findOneAndUpdate({_id:_id},{$set:payload},{new:true})
        res.json({
          message:"Event updated successfully",
          data:fresult,
          status:res.statusCode
        })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

 

  const deleteEventImage=async(req,res)=>{
    try {
     
      let {_id,cloudinary_id}=req.body

      
      let deleteImages=await deleteImageCloud(cloudinary_id)
      // console.log("deleteImages",deleteImages);

      if(deleteImages){
        let findEvent=await Event.findOne({_id:_id})

        // console.log("find",findEvent.eventImages.length);
        let tempArr=findEvent.eventImages.filter(item=>{
          return item.cloudinary_id !== cloudinary_id
        })
      
        if(tempArr.length<findEvent.eventImages.length){
          let updateEventImage=await Event.findByIdAndUpdate({
            _id:_id
          },
          {
            $set:{
              eventImages:tempArr
            }
          },
           {new:true}
          )

          return res.json({
            data:updateEventImage,
            message:"Event image updated successfully",
            status:res.statusCode
          })
        }

      }
  
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  }


  const deletEvent=async(req,res)=>{

    try {
      let {match='{}'}=req.query

      let pasreMatch=JSON.parse(match)


      let deleteEvent;
              
       let findExistingEvent=await Event.findOne(pasreMatch)
      
         if(findExistingEvent){
          if(findExistingEvent.eventImages.length >0){
               for (let i = 0; i < findExistingEvent.eventImages.length; i++) {
                const element = findExistingEvent.eventImages[i]
                await deleteImageCloud(element?.cloudinary_id)
                
               }

              deleteEvent=await Event.findByIdAndDelete(pasreMatch,{new:true})
         }

        }
     
     
        res.json({
          message:"Event deleted successfully",
          data:deletEvent,
          status:res.statusCode
        })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

//get Event between  dates
const eventDate=async(req,res)=>{
  const from= req.params.from
  const to=req.params.to

  const findDate=await Event.aggregate(
      [{$match: {event_date: { $gte:new Date(from),$lte:new Date(to)}}},
      {$project:{'_id':0}}
      ])
    if(findDate.length<=0) return res.status(400).send("Data not found")
    res.send(findDate);
}

const EventName=async(req,res)=>{
  try {
    let event_name=req.params.event_name
    const getEvent=await Event.find({event_name:event_name})
    if(getEvent.length<=0) return res.status(400).send("No data in this event name")
    return res.send(getEvent)
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const EventPlace=async(req,res)=>{
  try {
    let event_place=req.params.event_place
    const getEvent=await Event.find({event_place:event_place})
    if(getEvent.length<=0) return res.status(400).send("No data in this event place")
    return res.send(getEvent)    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const EventAssociation=async(req,res)=>{
  try {
    let inAssociationWith=req.params.inAssociationWith
    const getEvent=await Event.find({inAssociationWith:inAssociationWith})
    if(getEvent.length<=0) return res.status(400).send("No data in this Association")
    return res.send(getEvent)    
  } catch (error) {
    res.status(400).send(error.message)
  }
}


const Eventonedate=async(req,res)=>{
  try {
    let event_date=req.params.event_date
    const getEvent=await Event.find({event_date:event_date})
    if(getEvent.length<=0) return res.status(400).send("No data in this Ḍate")
    return res.send(getEvent)    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const recentEvent=async(req,res)=>{
  try{
    const view=await Event.find()
    // res.send(view)
    // console.log(view)
    let data=view.slice(Math.max(view.length - 5, 0))
    res.send({
      message:"fetched successfully",
      data:data
    })

  }catch(error){
    res.status(400).send(error.message)
  }

}


export {addEvent,allEvent,updateEvent,deletEvent,
  eventDate,EventName,EventPlace,EventAssociation,Eventonedate,recentEvent,addEventImages,deleteEventImage}