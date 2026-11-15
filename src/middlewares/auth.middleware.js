import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const tokenCrudo = req.headers['authorization'];

    if (!tokenCrudo) {
        return res.status(400).json({ error: 'token no proporcionado' })
    }

    const tokenOK = tokenCrudo.startsWith('Bearer ') ? tokenCrudo.split(' ')[1] : tokenCrudo;

    try {

        const validToken = jwt.verify(tokenOK, process.env.JWT_SECRET);

        req.usuario = validToken;

        next();
    }catch (error) {
        res.status(400).json({ error: 'token invalido' })
    }
}