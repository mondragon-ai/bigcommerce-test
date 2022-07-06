"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const api_1 = require("./lib/api");
// Set port
const port = 8080;
// Create listener
api_1.app.listen(port, () => { console.log(`Currently listtening to http://127.0.0.1:${port}`); });
//# sourceMappingURL=index.js.map