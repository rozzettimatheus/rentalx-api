import express from 'express'

// routes
import { categoriesRoutes } from './routes/categories.routes'

const app = express()

// enables JSON parsing
app.use(express.json())

// endpoints
app.use('/categories', categoriesRoutes)

// base_url: http://localhost:3333
app.listen(3333)
