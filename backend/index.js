import express from 'express'
import api from './routes/api.js'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { configDotenv } from "dotenv";
configDotenv()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1', api)

app.listen(process.env.APP_PORT, () => {
    console.log('Server running on port ' + process.env.APP_PORT)
})