import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import cors from 'cors';
const db = require("./models/index.js");
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));

//config view engine

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    //Callback when server started
    console.log("Backend NodeJS is running on port: " + port);
});