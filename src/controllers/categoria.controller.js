import { pool } from "../config/database.js"

export const getAllCategorias = async (req,res) => {

    try{

        const [rows] = await pool.query(
            'SELECT * FROM categoria'
        )
        res.json(rows)

    } catch (error) {

        res.status(500).json({ error: 'error al obtener todas las categorias' })
    }
    
}

export const getCategoriaById = async (req, res) => {

    const { id } = req.params

    const [rows] = await pool.query(
        'SELECT * FROM categoria WHERE id_categoria = ?', [id]
    )

    if ( !rows.length ) {
        res.status(404).json({ message: `categoria con id ${id} no encontrada` })
        return
    }else {
    res.json(rows)
    }
}

export const postNewCategoria = async (req, res) => {

    const { nombre } = req.body

    try {

    const [result] = await pool.query(
        'INSERT INTO categoria (nombre) VALUES (?)',
        [nombre]
    )

    res.status(201).json({ 
        id: result.insertId,
        nombre

     })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'no se pudo crear la categoria' })
    }
}

export const putNewCategoria = async (req, res) => {

    const { id } = req.params
    const { nombre } = req.body

    try {
        const [result] = await pool.query(
            'UPDATE categoria SET nombre = ? WHERE id_categoria = ?',
            [nombre, id]
        )

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `categoria con id ${id} no encontrada` })
            return
        }

        res.json({ message: 'categoria actualizada correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'no se pudo actualizar la categoria' })
    }
}

export const deleteCategoria = async (req, res) => {

    const { id } = req.params

    try {
        const [result] = await pool.query(
            'DELETE FROM categoria WHERE id_categoria = ?',
            [id]
        )

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `categoria con id ${id} no encontrada` })
            return
        }

        res.json({ message: 'categoria eliminada correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'no se pudo eliminar la categoria' })
    }
}
