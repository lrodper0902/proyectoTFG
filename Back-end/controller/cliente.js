const Cliente = require('../models/Cliente');

const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los clientes', error });
    }
};

const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente.length > 0) {
            res.json(cliente);
        } else {
            res.status(404).send({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el cliente', error });
    }
};

// const registerUser = async (req, res) => {
//     try {
//         const result = await Cliente.register(req.body);
//         res.status(201).send({ message: 'Usuario registrado exitosamente', id: result.insertId });
//     } catch (error) {
//         if (error.code === 'ER_DUP_ENTRY') {
//             res.status(409).send({ message: 'El email ya está en uso.' });
//         } else {
//             res.status(500).send({ message: 'Error al registrar el usuario', error: error.message });
//         }
//     }
// };

// const login = async(req, res) => {
//     const { email, password } = req.body;

//     // Primero, verifica si el email y la contraseña han sido proporcionados
//     if (!email || !password) {
//         return res.status(400).send({
//             success: false,
//             message: 'Email y contraseña son requeridos'
//         });
//     }

//     try {
//         const loginResult = await Cliente.login(email, password);

//         // Después, verifica si el resultado del login es exitoso
//         if (loginResult) {
//             res.status(200).json({
//                 success: true,
//                 message: 'Autenticación exitosa',
//                 token: loginResult.token
//             });
//         } else {
//             res.status(401).json({
//                 success: false,
//                 message: 'Correo electrónico o contraseña incorrectos'
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error interno del servidor',
//             error: error.message
//         });
//     }
// };

const createCliente = async (req, res) => {
    try {
        const result = await Cliente.create(req.body);
        res.status(201).send({ message: 'Cliente creado', id: result.insertId });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el cliente', error });
    }
};

const updateCliente = async (req, res) => {
    console.log("Ha entrado a la base de datos de cliente")
    try {
        console.log("Estrar en el try")
        const result = await Cliente.update(req.params.id, req.body);
        console.log("linea 87")
        console.log(result.affectedRows )

        if (result.affectedRows > 0) {
            res.send({ message: 'Cliente actualizado' });
        } else {
            res.status(404).send({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el cliente', error });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const result = await Cliente.delete(req.params.id);
        if (result.affectedRows > 0) {
            res.send({ message: 'Cliente eliminado' });
        } else {
            res.status(404).send({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el cliente', error });
    }
};

//Export acciones
module.exports = {
    getAllClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}