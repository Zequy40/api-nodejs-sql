import express from 'express'
import indexRoutes from './routes/index.routes.js'
import exerciceRoute from './routes/exercice.routes.js'


const app = express();

app.use (express.json()); // Parse JSON bodies (req.body)

app.use('/api', indexRoutes)
app.use('/api', exerciceRoute)
app.use((req,res,next) => {
  res.status(404).json({message: "Endpoint not found"})
})


export default app