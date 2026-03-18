const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Token de autorização necessário' })
    }
    const token = authorization.replace('Bearer ', '')

    let payload;

    try {
        payload = jwt.verify(token, 'sua-chave-secreta');
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' })
    }

    req.user = payload
    next()
}

module.exports = auth;