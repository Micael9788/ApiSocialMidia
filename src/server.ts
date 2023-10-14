import express, { json, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import { mongoConnect } from './database'
import { authRouter } from './router'

const app = express()

const production = process.env.NODE_ENV === 'production'

config(
  {
    path: production ? '.env' : '.env.example'
  }
)

const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use(authRouter)

app.listen(PORT, () => {
  mongoConnect().then(_ => {
    if (process.env.DEBUG) {
      console.log('Server has been started')
    }
  }).catch(error => {
    if (process.env.DEBUG) {
      console.log(error)
    }
  })
})
