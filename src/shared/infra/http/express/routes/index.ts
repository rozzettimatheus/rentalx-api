import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { carRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { rentalRoutes } from './rental.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()

// endpoints
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/sessions', authenticateRoutes)
router.use('/cars', carRoutes)
router.use('/rentals', rentalRoutes)

export { router }
