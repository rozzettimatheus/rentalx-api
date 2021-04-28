import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImageUseController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin'

const carRoutes = Router()
const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageUseController = new UploadCarImageUseController()

const upload = multer(uploadConfig.upload({ destination: './tmp/cars' }))

carRoutes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
)

carRoutes.get('/available', listAvailableCarsController.handle)

carRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarSpecificationController.handle
)

carRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureIsAdmin,
  upload.array('imageFiles'),
  uploadCarImageUseController.handle
)

export { carRoutes }
