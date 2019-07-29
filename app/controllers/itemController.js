const path = require('path');
const service = require(path.join(__dirname, '..', '../server/services/itemService.js'));
const error = require(path.join(__dirname, '..', '../server/error.js'));

itemController = {};

itemController.getItemById = (req, res) => {
    const id = req.params.id

    if(id) {
        service.getItem(id)
        .then(data => {
            res.send(data);
        })
        .catch(err =>
            res.send(error)
        )
    }
}

itemController.getItems = (req, res) => {

    const query = req.query.q || '';

    if (query){

        service.getItems(query)
        .then(data => {
            res.send(data)
        })
        .catch(err =>
            res.send(error)
        )
    }
}

module.exports = itemController;