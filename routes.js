const express = require('express');
const router = express.Router();

const itemController = require('./app/controllers/itemController');

router.get('/items/:id', itemController.getItemById);

router.get('/items', itemController.getItemsByQuery);

// Otras rutas
router.get('*', (req, res) => {
    res.send('Not found.')
});

module.exports = router;