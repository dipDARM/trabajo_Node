import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

export const register = async ( req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña){
        return res.status(400).json({ error: 'correo y contraseña son obligatorios'})
    }

    if (contraseña.length < 5){
        return res.status(400).json({ error: 'la contraseña debe tener almenos 5 caracteres'})
    }
    try {

        const [userExists] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ?', [correo]
        )
        if (userExists.length > 0){
            return res.status(400).json({ error: 'el correo ya existe'})
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10)

        const [rows] = await pool.query(
            'INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)', [correo, hashedPassword]
        )

        res.status(201).json({
            mensaje: 'usurio resgistrado con exito',
            id: rows.insertId,
            correo
        })
    }catch (error) {
        res.status(500).json({ error: 'no se puudo crear el usuario' })
    }
}

export const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña){
        return res.status(400).json({ error: 'correo y contraseña son obligatorios'})
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ?', [correo]
        )
        if (rows.length === 0){
            return res.status(400).json({ error: 'correo no registrado'})
        }

        const user = rows[0];

        const credentialsOK = await bcrypt.compare(contraseña, user.contraseña)

        if (!credentialsOK){
            return res.status(400).json({ error: 'credenciales invalidas'})
        }

        const token = jwt.sign(
            { id: user.id, correo: user.correo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            mensaje: 'inicio de sesion exitoso',
            token
        })

    } catch (error) {
        res.status(500).json({ error: 'error al iniciar sesion' })
    }
}