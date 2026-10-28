import { pool } from "../config/database.js"

export const getAllPruducts = async (req, res) => {
    
    try{

        const [rows] = await pool.query(
            'SELECT * FROM products'
        )

        res.json(rows)

    } catch (error) {

        res.status(500).json({ error: 'error al obtener todos'})

    }
}

export const getProductById = async (req, res) => {

    const { id } = req.params

    const [rows] = await pool.query(
        'SELECT * FROM products WHERE id_producto = ?', [id]
    )

        if ( !rows.length ) {
            res.status(404).json({ message: `producto con id ${id} no encontrado` })
            return
        }else {

        res.status(200).json(rows[0])
    }

}

export const postNewProduct = async (req, res) => {

    const { nombre, precio, stock } = req.body

    try {

        const [rows] = await pool.query(
            'INSERT INTO products (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock]
        )

        res.status(201).json({ 
            id: rows.insertId,
            precio,
            nombre,
            stock
         })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'no se pudo crear el producto' })
    }
}

export const putNewProduct = async(req, res) => {
    const { nombre, precio, stock} = req.body
    const {id} = req.params

    const [result] = await pool.query(
    'UPDATE products SET nombre = ?, precio = ?, stock = ? WHERE id =?', [nombre, precio    , stock, id]
    )

    if (result.affectedRows === 0) {
        res.status(404).json({error: 'No se pudo actualizar el producto'})
    } else{
        res.status(200).json({
            id: Number(id),
            nombre,
            precio,
            stock
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query(
        'DELETE FROM products WHERE id = ?', [id]
    )
    if (result.affectedRows === 0) {
        res.status(404).json({error: 'No se pudo eliminar el producto'})
    } else {
        res.status(200).json({message: 'Producto eliminado correctamente'})
    }
}