import express from 'express'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../utils/multer.js'

import {addEvent,allEvent,updateEvent,eventDate,EventName,EventPlace,EventAssociation,Eventonedate,recentEvent, addEventImages, deleteEventImage, deletEvent} from '../controller/event.js'
import { addCamp,referCamp, updateCamp ,campDate, getAll,updateCampImage,
Camptype,Campplace,Campname,Fromdate,Enddate, deleteCamp} from '../controller/camp.js'
import { deleteImageCloud } from '../helpers/ImageUpload.js'


const router=express.Router()

//add events

router.post('/addEvent',addEvent)

router.post('/uploadImages',
upload.fields([{ name: 'files', maxCount: 8 }]),
addEventImages)

router.patch('/deleteImage',deleteEventImage)

router.get('/viewEvent',allEvent)

router.patch('/updateEvent',updateEvent)

router.delete('/deleteEvent',deletEvent)
// router.post('/update/event/image/:event_name',[auth,admin],upload.single('image'),updateEventImage)

router.get('/event/name/:event_name',[auth,admin],EventName)

router.get('/event/place/:event_place',[auth,admin],EventPlace)

router.get('/event/associate/:inAssociationWith',[auth,admin],EventAssociation)

router.get('/event/between/:from/:to',[auth,admin],eventDate)

router.get('/event/date/:event_date',[auth,admin],Eventonedate)

router.get('/recentEvent',recentEvent)


//add camps

router.post('/addCamp',upload.single('file'),addCamp)

router.post('/camp/refer',referCamp)

router.post('/update/camp/:cadet_regimentNo/:camp_name',updateCamp)

router.post('/update/camp/image/:cadet_regimentNo/:camp_name',upload.single('image'),updateCampImage)

router.get('/camp/between/:start_date/:end_date',campDate)

router.get('/camp/enddate/:end_date',Enddate)

router.get('/camp/fromdate/:start_date',Fromdate)

router.get('/camp/filter/type/:camp_type',Camptype)

router.get('/camp/filter/place/:camp_place',Campplace)

router.get('/camp/filter/name/:camp_name',Campname)

router.get('/viewCamp',getAll)

router.delete('/deleteCamp',deleteCamp)

export default router