import {pool} from '../db.js'

export const getExercices = async (req, res) =>{
    try{
    const [rows] = await pool.query('SELECT * FROM exercice') 
    res.json([rows])
    }catch(error){
        return res.status(500)
            .json({message: "Algo fue mal! Error en el servidor"})
    }
}

export const getExercice = async (req, res) =>{
    try{
    const [rows] = await pool.query('SELECT * FROM exercice WHERE id = ?', [req.params.id])
    console.log([rows]);
    if(rows.length <= 0) return res.status(404).send("L'exercice demandé n'est pas disponible")
    else 
    return res.json(rows[0])
    }catch(error){
        return res.status(500)
            .json({message: "Algo fue mal! Error en el servidor"})
    }
    
}

export const createExercices = async (req, res) =>{
    const {nom,marks,description,set1,set2,set3,set4} = req.body
    try {   
    const [rows] = await pool.query('INSERT INTO exercice (nom,marks,description,set1,set2,set3,set4) VALUES (?,?,?,?,?,?,?)', [nom,marks,description,set1,set2,set3,set4])
    console.log(req.body);
    res.send(
    {
        id:rows.insertID,
        nom,
        marks,
        description,
        set1,
        set2,
        set3,
        set4
    }
)
    } catch (error) {
        return res.status(500)
            .json({message: "Algo fue mal! Error en el servidor"})
    }
    }
export const updateExercices = async (req,res)=> {
    const {id} = req.params
    const {nom,marks,description,set1,set2,set3,set4} = req.body
    try {
    const [result] = await pool.query('UPDATE exercice SET nom = IFNULL(?, nom), marks = IFNULL(?,marks) ,description = IFNULL(?,description),set1 = IFNULL(?,set1),set2 = IFNULL(?,set2),set3 = IFNULL(?,set3),set4 = IFNULL(?,set4) WHERE id = ?', [nom,marks,description,set1,set2,set3,set4,id])

    if(result.affectedRows === 0 ) return res.status(404).json({message: "Ejercicio no encontrado"})
    const [rows] = await pool.query('SELECT * FROM exercice WHERE id = ?', [id])
    res.json(rows)
   } catch (error) {
    return res.status(500)
            .json({message: "Algo fue mal! Error en el servidor"})
   }

}
export const deleteExercices = async (req, res) => {
    try {
    const [result] = await pool.query('DELETE FROM exercice WHERE id = ?', [req.params.id])
    if(result.affectedRows < 0) return res.status(404).json({message: 'Ejercicio no encontrado'})
    res.sendStatus(204)
    } catch (error) {
        return res.status(500)
            .json({message: "Algo fue mal! Error en el servidor"})
    }
    
}