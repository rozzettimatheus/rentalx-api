import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { router } from './routes'
import swaggerConfig from './swagger.json'

const app = express()

// enables JSON parsing
app.use(express.json())

// criar um url para acessar os docs do swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

// base_url: http://localhost:3333
app.listen(3333)
