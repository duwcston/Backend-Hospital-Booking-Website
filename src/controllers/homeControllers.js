import db from '../models/index.js';
import CRUDService from '../services/CRUDService.js';

// Importing the service
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)

        });
    }
    catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('aboutPage.ejs');
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

// Create new user
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD from controller");
}

// Display all users from database 
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    console.log(data);

    // Render data to View through displayCRUD.ejs
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    // console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData);
        // Validate if user exists
        return res.render("editCRUD.ejs", {
            user: userData,
        });
    }
    else {
        return res.send("User not found");
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserData(id);
        return res.send("Delete CRUD from controller");
    }
    else {
        return res.send("User not found");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}   