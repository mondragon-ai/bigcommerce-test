const BC_STORE_HASH = process.env.BC_STORE_HASH;
const BASE_URL = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/`; 
const fetch = require('node-fetch') 
const BIG_COMMERCE_ACCESS_TOKEN = process.env.BIG_COMMERCE_ACCESS_TOKEN;
const BIG_COMMERCE_HEADERS = { 
    'Content-Type': 'application/json',
    'X-Auth-Token': BIG_COMMERCE_ACCESS_TOKEN 
};

/**
 * 
 * Create a Big Commerce Customer 
 * @param { name & email} data to submit
 * @returns Big Commerce Customer ID
 */
export async function createBigCommerceCustomer(data) {

    // Check the status of the Shopify Create Customer Call
    async function checkStatus(r) {

        const data = await r.json();

        // If 200 >= x < 300, & return customer ID
        if (r.ok) { 

            return  data.data[0].id

        } else if ( r.status == 422 ) { 
            
            return "ERROR: User already exists."

        } else {
            return "ERROR: Big Commerce Error"
        }
    };

    const bc_ucid = await fetch(BASE_URL + `customers`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: BIG_COMMERCE_HEADERS
    })
    .then(res => checkStatus(res))
    .then(json => json);

    return bc_ucid;
};

/**
 *  Create Cart WITH product
 *  @param { body, BC_UUID } data 
 *  @returns String for BC_Cart 
 */
export async function createBigCommerceCart(body) {

    // Check the status of the Shopify Create Customer Call
    async function checkStatus(r) {

        const data = await r.json();

        // If 200 >= x < 300, & return customer ID
        if (r.ok) { 

            return data.data.id

        } else if ( r.status == 422 ) { 
            
            return "ERROR: User already exists."

        } else {
            return "ERROR: Big Commerce Error"
        }
    };

    const cart = await fetch(BASE_URL + `carts`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: BIG_COMMERCE_HEADERS
    })
    .then(res => checkStatus(res))
    .then(json => json);

    return cart;
};


/**
 *  Create Cart WITH product
 *  @param { checkoutId } data 
 *  @returns String for BC_Cart 
 */
 export async function cartToCheckout(checkoutId?: string) {

    // Check the status of the Shopify Create Customer Call
    async function checkStatus(r) {

        const data = await r.json();

        // If 200 >= x < 300, & return customer ID
        if (r.ok) { 

            console.log("101 - Cart: ", data)

            return data.data.id

        } else if ( r.status == 422 ) { 

            console.log(data.title, data.instance)
            
            return "107 - ERROR: Cart Error"

        } else {
            return "110 - ERROR: Big Commerce Error"
        }
    };

    const cart = await fetch(BASE_URL + `checkouts/${checkoutId}/orders`, {
        method: 'post',
        headers: BIG_COMMERCE_HEADERS
    })
    .then(res => checkStatus(res))
    .then(json => json);

    return cart;
};

export async function addBillingToCheckout(checkoutId, body) {

     // Check the status of the Shopify Create Customer Call
     async function checkStatus(r) {

        const data = await r.json();

        // If 200 >= x < 300, & return customer ID
        if (r.ok) { 

            console.log("101 - Cart: ", data)

            return data.data.id

        } else if ( r.status == 422 ) { 
            
            return "107 - ERROR: Cart Error"

        } else {
            return "110 - ERROR: Big Commerce Error"
        }
    };

    const cart = await fetch(BASE_URL + `checkouts/${checkoutId}/billing-address`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: BIG_COMMERCE_HEADERS
    })
    .then(res => checkStatus(res))
    .then(json => json);

    return cart;
};


export async function addShippingToCustomer(body) {

    // Check the status of the Shopify Create Customer Call
    async function checkStatus(r) {

       const data = await r.json();

       // If 200 >= x < 300, & return customer ID
       if (r.ok) { 

           return data

       } else if ( r.status == 422 ) { 

        console.log(data.title, data.instance)
           
           return "107 - ERROR: Cart Error"

       } else {
           return "110 - ERROR: Big Commerce Error"
       }
   };

   const cart = await fetch(BASE_URL + `customers/addresses`, {
       method: 'post',
       body: JSON.stringify(body),
       headers: BIG_COMMERCE_HEADERS
   })
   .then(res => checkStatus(res))
   .then(json => json);

   return cart;
};




// TODO: Add to Product
// TODO: Create Checkout 
// TODO: Add Discount
// TODO: 