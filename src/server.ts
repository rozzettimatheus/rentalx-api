import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import './shared/container'
import './database'
import { AppError } from './errors/AppError'
import { router } from './routes'
import swaggerConfig from './swagger.json'

const app = express()

// enables JSON parsing
app.use(express.json())

// swagger docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

// error handling
app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  }
)

// base_url: http://localhost:3333
app.listen(3333, () => {
  console.log('Server running on port 3333 🚀')
})
