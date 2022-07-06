"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const bigcommerce_1 = require("./bigcommerce");
const express = require('express');
const cors = require('cors');
// Create Express App
exports.app = express();
// Add Expres Middleware
exports.app.use(express.json());
exports.app.use(cors({ origin: true }));
/**
 *  TEST ROUTE - Used for testing new APIs
 *  @return { msg, data? }
 */
exports.app.post('/test', async (req, res) => {
    // const { FB_UUID } = req.body;
    const cart_id = "6d4972e5-c644-404a-85e4-0d1afd7479af";
    const body = [{
            customer_id: 14,
            first_name: "Angel ",
            last_name: "Mondragon",
            address1: "123 Main Street",
            city: "Austin",
            state_or_province: "New Mexico",
            state_or_province_code: "NM",
            country_code: "US",
            postal_code: "87571"
        }];
    const cart = await bigcommerce_1.cartToCheckout(cart_id);
    console.log(cart);
    res.status(200).json({ m: "SUCCESS 💯", d: cart });
});
//# sourceMappingURL=api.js.map