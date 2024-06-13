const Cliente = require('../models/cliente');

const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los clientes', error });
    }
};



const getCliente = async (req, res) => {
    //Cliente por id
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

const createCliente = async (req, res) => {
    //Registrarse
    try {
        console.log(req.body)
        const result = await Cliente.create(req.body);
        console.log("Resultados  " +result)
        
        res.status(201).send({ message: 'Cliente creado', id: result.insertId });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el cliente', error });
    }
};

const updateCliente = async (req, res) => {
    console.log("Ha entrado a la base de datos de cliente")
    try {
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
    //Tal vez lo elimine
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

const login = async(req, res)=>{
    console.log("Login")
    try {
        
        const user = await Cliente.login(req.body);
        console.log(user)
        console.log("Login correcto!!")

        res.json({
            message: 'Inicio de sesión',
            idCliente: user.idCliente,
            email: user.email,
            rol: user.rol
        })
    } catch (error) {
        console.error("Error en login: ", error.message);
        if (error.message === 'Contraseña incorrecta') {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

//Export acciones
module.exports = {
    getAllClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    login,

}