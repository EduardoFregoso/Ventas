const router = require('express').Router();

module.exports = (wagner) => {

    const userCtrl = wagner.invoke((Producto) =>
        require('../controllers/producto.controller')(Producto));

    router.get('/', (req, res) =>
        userCtrl.getAll(req, res));

    router.get('/:id', (req, res) =>
        userCtrl.getById(req, res));

    router.delete('/:id', (req, res) =>
        userCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        userCtrl.createProducto(req, res));

    router.put('/:id', (req, res) =>
        userCtrl.updateById(req, res));

    return router;
}