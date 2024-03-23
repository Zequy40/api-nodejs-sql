import {Router} from "express"
import {getExercices, getExercice,createExercices,updateExercices,deleteExercices} from '../controllers/exercices.controller.js'

const router = Router()

router.get('/exercices', getExercices)
router.get('/exercices/:id', getExercice)
router.post('/exercices', createExercices)
router.patch('/exercices/:id', updateExercices)
router.delete('/exercices/:id', deleteExercices)

export default router