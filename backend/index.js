import express from 'express'
import api from './routes/api.js'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1', api)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})