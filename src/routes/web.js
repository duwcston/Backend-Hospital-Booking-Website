import express from "express";
import homeControllers from "../controllers/homeControllers";
//init express router
let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
    router.get("/", homeControllers.getHomePage);
    return app.use("/", router);
}

module.exports = initWebRoutes;