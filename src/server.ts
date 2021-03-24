import express from 'express'

import { router } from './routes'

const app = express()

// enables JSON parsing
app.use(express.json())

app.use(router)

// base_url: http://localhost:3333
app.listen(3333)
