const path = require('path');
const service = require(path.join(__dirname, '..', '../server/services/itemService.js'));

itemController = {};

itemController.getItemById = (req, res) => {
    const id = req.params.id

    if(id) {
        service.getItem(id)
        .then(data => {
            res.send(data);
        })
        .catch(err =>
            console.log(err)
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
            console.log(err)
        )
    }
}

module.exports = itemController;