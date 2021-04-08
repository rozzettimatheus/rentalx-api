import 'reflect-metadata'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import './shared/container'
import './database'
import { router } from './routes'
import swaggerConfig from './swagger.json'

const app = express()

// enables JSON parsing
app.use(express.json())

// swagger docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

// base_url: http://localhost:3333
app.listen(3333, () => {
  console.log('Server running on port 3333 🚀')
})
