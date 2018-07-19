const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');


let _productos;

const getAll = (req, res) => {
    _productos.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'productos', res));
};

const getById = (req, res) => {
    const id = req.params.id;


    console.log(id.toString().length);

    if (id.toString().length != 24) {
        res.status(400);
        res.json({ err: "Identificador Invalido" })
    }
    else {
        _productos.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'producto', res));
    }
};

const deleteById = (req, res) => {
    const id = req.params.id;

    _productos.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(400);
            res.json({ msg: "No se pudo realziar la operacion, intente nuevamente" });
        } else {
            res.status(200);
            res.json({ msg: "El registro se elimino correctamente" });
        }
    });
};

const createProducto = (req, res) => {
    const producto = req.body;

    _productos.create(producto)
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

    _productos.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(400);
            res.json({ msg: "No se pudo realziar la operacion, intente nuevamente" });
        } else {
            res.status(200);
            res.json({ msg: "El registro se modifico correctamente" });
        }
    });
};

module.exports = (Noticias) => {
    _productos = Noticias;
    return ({
        getAll,
        getById,
        deleteById,
        createProducto,
        updateById
    });
}