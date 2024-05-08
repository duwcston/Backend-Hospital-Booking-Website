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

    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD
}