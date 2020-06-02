const jwt = require('jsonwebtoken');

//Virificar token



let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messager: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });



};

let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE') {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    } else {
        next();
    }

}

module.exports = {
    verificaToken,
    verificaAdmin
}