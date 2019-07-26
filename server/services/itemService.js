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


            var item = {
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
            // Busco la descripción
               return getItemDescription(id)
                .then(data => {
                    item.description = data;
                    return item;
                }
            )
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
        .then(response => response.plain_tex )
        .catch(err =>{
            console.log(err);
        })
}

/**
 * Obtiene los items según una query de busqueda
 * @param {*} query 
 */
function getItemsByQuery(query) {
    var request = {
        url: `${_BASEURL}/sites/MLA/search?q=+${query}`,
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
                list_categories = filter.values.map(cat => cat.name);
            }
        }
       
        if (data.results) {


            // Obtengo los primeros 4 resultados
            var items = data.results.slice(0,4);
        
            var url_picture = '';
            if(data.pictures) {
                url_picture = data.pictures.length ? data.pictures[0].secure_url : '';
            }

            const free_shipping = data.shipping ? data.shipping.free_shipping : false;

            const categories = [];

            items = data.results.map(item => {

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
                    picture: url_picture,
                    condition: data.condition,
                    free_shipping: free_shipping,
                }
            });

            const result = {
                author: {
                    name: "Evelyn",
                    lastname: "Pividori"
               },
               categorias: list_categories,
               items: items
            }

            return result;
        }    
    })
    .catch(err =>{
        console.log(err);
    })
}

module.exports.getItem = getItem;
module.exports.getItemDescription = getItemDescription;
module.exports.getItemsByQuery = getItemsByQuery;