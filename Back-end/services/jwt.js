const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta
const secret = "Clave_secreta";

//Restringir el uso a cierto usuario gracias, con el token. El token se ouede descifrar
exports.create_token = (user) =>{
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix
    }

    return jwt.encode(payload, secret);
}
