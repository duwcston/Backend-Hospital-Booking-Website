import express from "express";
import homeControllers from "../controllers/homeControllers";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
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

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctors);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    return app.use("/", router);
}

module.exports = initWebRoutes;