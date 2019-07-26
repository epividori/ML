const path = require('path');
const service = require(path.join(__dirname, '..', '../server/services/itemService.js'));
itemController = {};

/**
 * Obtiene un ítem según su id
 */
itemController.getItemById = (req, res) => {
    const id = req.params.id

    if(id) {
        service.getItem(id)
        .then(data => {
            res.send(data)
        })
        .catch(err =>
            console.log(err)
        )
    }
}

itemController.getItemsByQuery = (req, res) => {
    const query = req.query.q || '';

    if (query){

        service.getItemsByQuery(query)
        .then(data => {
            res.send(data)
        })
        .catch(err =>
            console.log(err)
        )
    }
}
module.exports = itemController;