import db from '../models/index.js';

// Importing the service
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('----------------------');
        console.log(data);  
        console.log('----------------------');
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
    
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getHomePage: getHomePage,
}