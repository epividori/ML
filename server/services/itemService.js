const axios = require('axios');

const _BASEURL = 'https://api.mercadolibre.com';

/**
 * Obtiene un artículo según su id
 * @param {} id
 */
function getItem(id)
{
    var request = {
        url: `${_BASEURL}/items/${id}`,
        method: 'GET'
    };

    return axios(request)
        .then(response => {

            const data = response.data;

            var url_picture = '';
            if(data.pictures) {
                url_picture = data.pictures.length ? data.pictures[0].secure_url : '';
            }
            const free_shipping = data.shipping ? data.shipping.free_shipping : false;

            var price_array = data.price.toString().split('.');

            const price = price_array[0];
            const decimals = price_array[1] ? price_array[1] : '00';


            var response = {
                author: {
                    name: 'Evelyn',
                    lastname: 'Pividori'
                },
                item: {
                    id: data.id,
                    title: data.title,
                    price: {
                        currency: data.currency_id,
                        amount: price,
                        decimals: decimals
                    },
                    picture: url_picture,
                    condition: data.condition,
                    free_shipping: free_shipping,
                    sold_quantity: data.sold_quantity,
                    description: ''
                }
            }

            return response;
        })
        .then(response => {

            return getItemDescription(response.item.id)
                    .then(result => {
                        response.item.description = result;
                        return response;
                    })
        })
        .catch(err =>{
            console.log(err);
        })
}

/**
 * Obtiene la descripción de un item
 * @param {} id
 */
function getItemDescription(id) {
    var request = {
        url: `${_BASEURL}/items/${id}/description`,
        method: 'GET'
    };

    return axios(request)
        .then(response => response.data.plain_text)
        .catch(err =>{
            console.log(err);
        })
}

/**
 * Obtiene los items según una query de busqueda
 * @param {*} query 
 */
function getItems(query) {

    var request = {
        url: `${_BASEURL}/sites/MLA/search?q=${query}`,
        method: 'GET'
    };

    return axios(request)
    .then(response => {

        const data = response.data;

        var list_categories = [];
        if(data.filters) {
            
            // Se busca el filtro relacionados a la Categoria
            const filter = data.filters.find(filter => filter.id == "category" );

            if(filter) {
                list_categories = filter.values[0].path_from_root.map((cat) => cat.name);
            }
        }

        var items = [];
        if (data.results) {

            // Obtengo los primeros 4 resultados
            items = data.results.slice(0,4);

            items = items.map(item => {

                // Separador del precio
                var price_array = item.price.toString().split('.');
                const price = price_array[0];
                const decimals = price_array[1] ? price_array[1] : '00';

                return {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: price,
                        decimals: decimals
                    },
                    picture: item.thumbnail ? item.thumbnail : '',
                    condition: item.condition,
                    free_shipping: item.shipping ? item.shipping.free_shipping : false,
                    address: item.address ? item.address.state_name : ''
                }
            });
        }    

        const result = {
            author: {
                name: "Evelyn",
                lastname: "Pividori"
           },
           categories: list_categories,
           items: items
        }

        return result;
    })
    .catch(err =>{
        console.log(err);
    })
}

module.exports.getItem = getItem;
module.exports.getItemDescription = getItemDescription;
module.exports.getItems = getItems;