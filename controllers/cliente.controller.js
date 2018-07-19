const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');


let _cliente;

const getAll = (req, res) => {
    _cliente.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'cliente', res));
};

const getById = (req, res) => {
    const id = req.params.id;


    console.log(id.toString().length);

    if (id.toString().length != 24) {
        res.status(400);
        res.json({ err: "Identificador Invalido" })
    }
    else {
        _cliente.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'cliente', res));
    }
};

const deleteById = (req, res) => {
    const id = req.params.id;

    _cliente.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(400);
            res.json({ msg: "No se pudo realziar la operacion, intente nuevamente" });
        } else {
            res.status(200);
            res.json({ msg: "El registro se elimino correctamente" });
        }
    });
};

const createCliente = (req, res) => {
    const cliente = req.body;

    _cliente.create(cliente)
        .then(
            (data) => {
                res.status(200);
                res.json({ msg: "Registro creado correctamente", data: data });
            }
        )
        .catch(
            (err) => {
                res.status(400);
                res.json({ msg: "Algo va mal", data: err });
            }
        )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = { _id: id };

    _cliente.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(400);
            res.json({ msg: "No se pudo realziar la operacion, intente nuevamente" });
        } else {
            res.status(200);
            res.json({ msg: "El registro se modifico correctamente" });
        }
    });
};

module.exports = (Cliente) => {
    _cliente = Cliente;
    return ({
        getAll,
        getById,
        deleteById,
        createCliente,
        updateById
    });
}