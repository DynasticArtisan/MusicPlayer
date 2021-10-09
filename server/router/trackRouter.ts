import express from 'express'
const trackRouter :express.Router = express.Router()
const trackController = require('../controllers/trackController')

trackRouter.post('/', trackController.create)
trackRouter.get('/', trackController.getUserTracks)
trackRouter.delete('/:id', trackController.delete)

trackRouter.get('/search', trackController.search)

trackRouter.get('/liked', trackController.getUserLikesTracks)
trackRouter.post('/liked', trackController.addUserLikesTrack)
trackRouter.delete('/liked/:id', trackController.removeUserLikesTrack)


export default trackRouter