import express from 'express'
import indexRoutes from './routes/index.routes.js'
import exerciceRoute from './routes/exercice.routes.js'
import {PORT} from './config.js'

const app = express();

app.use (express.json()); // Parse JSON bodies (req.body)

app.use('/api', indexRoutes)
app.use('/api', exerciceRoute)
app.use((req,res,next) => {
  res.status(404).json({message: "Endpoint not found"})
})
app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})