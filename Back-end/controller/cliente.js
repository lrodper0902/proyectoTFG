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