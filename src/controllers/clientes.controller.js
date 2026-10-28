import e from "express"
import { pool } from "../config/database.js"

export const getAllClientes = async (req, res) =>{

    try{

        const [rows] = await pool.query(
            'SELECT * FROM cliente'
        )

        res.json(rows)

    } catch (error) {

        res.status(500).json({ error: 'error al obtener todos'})
    }
}

export const getClienteById = async (req, res) => {

    const { id } = req.params

    const [rows] = await pool.query(
        'SELECT * FROM cliente WHERE id_cliente = ?', [id]
    )

    if ( !rows.length ) {
        res.status(404).json({ message: `cliente con id ${id} no encontrado` })
        return
    }else {
    res.json(rows)
    }

}

export const postNewCliente = async (req, res) => {

    const { nombre, correo, ciudad } = req.body

    try {

        const [rows] = await pool.query(
            'INSERT INTO cliente (nombre, correo, ciudad) VALUES (?, ?, ?)',
            [nombre, correo, ciudad]
        )

        res.status(201).json({ 
            id: rows.insertId,
            nombre,
            correo,
            ciudad
            
         })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'no se pudo crear el cliente' })
    }
}

export const putNewCliente = async (req, res) => {

    const { id } = req.params
    const { nombre, correo, ciudad } = req.body

    const [result] = await pool.query(
        'UPDATE cliente SET nombre = IFNULL(?, nombre), correo = IFNULL(?, correo), ciudad = IFNULL(?, ciudad) WHERE id_cliente = ?',
        [nombre, correo, ciudad, id]
    )

    if (result.affectedRows === 0) {
        res.status(404).json({ message: `cliente con id ${id} no encontrado` })
        return
    }
    res.status(200).json({ message: `cliente con id ${id} actualizado correctamente` })
}

export const deleteCliente = async (req, res) => {

    const { id } = req.params

    const [result] = await pool.query(
        'DELETE FROM cliente WHERE id_cliente = ?',
        [id]
    )

    if (result.affectedRows === 0) {
        res.status(404).json({ message: `cliente con id ${id} no encontrado` })
        return
    }
    res.status(200).json({ message: `cliente con id ${id} eliminado correctamente` })
}