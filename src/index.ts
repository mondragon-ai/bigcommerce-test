require('dotenv').config();
import { app } from './lib/api'

// Set port
const port = 8080;

// Create listener
app.listen(port, () => { console.log(`Currently listtening to http://127.0.0.1:${port}`)})

