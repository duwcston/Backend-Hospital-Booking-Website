import db from '../models/index';
import bcrypt from 'bcryptjs';
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password','firstName','lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        resolve({
                            errCode: 0,
                            errMessage: 'OK',
                            user: user
                        })
                        

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Wrong password'
                        })
                    }
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'User not found'
                    })
                }

            } else {
                //return error
                resolve({
                    errCode: 1,
                    errMessage: `Your's Email isn't exist in our system, plz try other email`
                })
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = 'he';
            if(userId === 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL'){
                user = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(user)
        } catch(e){
            reject(e);
        }
    })
}
let signup = (request) => {
    return new Promise(async (resolve, reject) => {
        try{
            const { email, password,firstName, lastName, address, phonenumber, gender, roleId } = request;
            const hashPassword = bcryptjs.hashSync(password, 10);
          
            const [newUser, created] = await User.findOrCreate({
              where: { email },
              defaults: { 
                name: firstName,
                password: hashPassword,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phonenumber: phonenumber,
                gender: gender === '1' ? true : false,
                roleId: roleId,
              },
            });
            if (created) {
                resolve({
                    errCode: 0,
                    errMessage: "Signup successfully" }
                )
            
            } else{ 
                resolve({
                    errCode: 1,
                    errMessage: "User already existed" })
            }
        } catch(e){
            reject(e);
        }
    })
}
let forgotpassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try{
            const { email } = req.body;
            const validUser = await User.findOne({ where: { email } });
            if (!validUser)
              return next(errorHandler(404, "No user created with this email!"));
            const token =
              ({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
            const link = `<a href=localhost:3000/resetpassword/${validUser.id}/${token}>ResetPassword</a>`;
        
            const resetmail = {
              from: "onlinecvpr@hotmail.com",
              to: validUser.email,
              subject: "Reset password request",
              text: "Your password can be reset by clicking Reset password link below, the link will be expired after 15m\nIf you did not request, please ignore this email.",
              html: link,
            };
        
            transporter.sendMail(resetmail);
            console.log(email, id, "reset password");
            res.status(
              200,
              "A reset password link has been sent to your email to reset your password"
            );
        } catch(e){
            reject(e);
        }
    })
}
let handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required paremeters'
                })
            }

            let user = await db.User.findOne({
                where: {id: data.id},
                raw:false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            }else{
                resolve({
                  errCode: 0,
                  message: `User's not found!`  
                })
            }
        } catch(e){
            reject(e);
        }
    })
}
let handleDeleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let targetUser = await db.User.findOne({
                where: { id: userId },
            });
            
            if (!targetUser) {
                console.log("not exits");
                resolve({
                    errCode: 2,
                    errMessage: `the user isn't exits`})
            } else {
                await db.User.destroy({
                    where: { id: userId }
                })
                console.log("delete");
                resolve({
                    errCode: 0,
                    errMessage: 'Deleted successfully!'})
            }
        } catch(e){
            reject(e);
        }
    });
}
let getAllCodeService = (typeInput) =>{
    return new Promise( async (resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            }else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type : typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        }catch(e){
            rejec(e);
        }
    });
}
module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUser,
    signup,
    forgotpassword,
    handleEditUser,
    handleDeleteUser,
    getAllCodeService
}