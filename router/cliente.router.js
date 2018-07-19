const router = require('express').Router();

module.exports = (wagner) => {

    const userCtrl = wagner.invoke((Cliente) =>
        require('../controllers/cliente.controller')(Cliente));

    router.get('/', (req, res) =>
        userCtrl.getAll(req, res));

    router.get('/:id', (req, res) =>
        userCtrl.getById(req, res));

    /*router.get('/:id', (req, res) =>
        userCtrl.getByIdQR(req, res));

    router.get('/:mail/:pass', (req, res) =>
        userCtrl.login(req, res));*/

    router.delete('/:id', (req, res) =>
        userCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        userCtrl.createCliente(req, res));

    router.put('/:id', (req, res) =>
        userCtrl.updateById(req, res));

    return router;
}