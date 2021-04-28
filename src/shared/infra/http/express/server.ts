import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '@shared/container'
import swaggerConfig from '@modules/../swagger.json'
import { AppError } from '@shared/errors/AppError'
import createConnection from '@shared/infra/database/typeorm'
import { router } from '@shared/infra/http/express/routes'

createConnection()

const app = express()

// enable JSON parsing
app.use(express.json())

// swagger docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use(router)

// error handling
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: {
          message: err.message,
        },
      })
    }

    return response.status(500).json({
      error: {
        status: 'error',
        message: `Internal server error - ${err.message}`,
      },
    })
  }
)

// base_url: http://localhost:3333
app.listen(3333, () => {
  console.log('Server running on port 3333 🚀')
})
