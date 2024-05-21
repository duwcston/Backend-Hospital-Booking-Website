import express from "express";
import homeControllers from "../controllers/homeControllers";
import userController from '../controllers/userController';
//init express router
let router = express.Router();

//init all web routes
let initWebRoutes = (app) => {
    router.get("/", homeControllers.getHomePage);
    router.get("/about", homeControllers.getAboutPage);
    router.get("/crud", homeControllers.getCRUD);

    router.post("/post-crud", homeControllers.postCRUD);
    router.get("/get-crud", homeControllers.displayGetCRUD);
    router.get("/edit-crud", homeControllers.getEditCRUD);
    router.post("/put-crud", homeControllers.putCRUD);
    router.get("/delete-crud", homeControllers.deleteCRUD);


    router.post('/api/login', userController.handleLoging);
    router.get('/api/get-all-users', userController.handleGetAllUser);

    router.post('/api/signup', userController.signup);
    router.post('/api/forgotpassword', userController.forgotpassword);
    router.post('/api/resetpassword', userController.resetpassword);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);


    return app.use("/", router);
}

module.exports = initWebRoutes;