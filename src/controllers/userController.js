import userService from '../services/userService';

const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req,res) => {
  let id = req.query.id;

  if(!id){
    return res.status(200).json({
      errCode:1,
      errMessage: 'Missing required parameters',
      user:[]
    })
  }
  
  let users = await userService.getAllUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users
  })
}

  const signup = async (req, res, next) => {
    
    let message = await userService.signup(req.body);
    return res.status(200).json(message);
        // const { email, password,firstName, lastName, address, phonenumber, gender, roleId } = req.body;
        // console.log(req.body);
        // const hashPassword = bcryptjs.hashSync(password, 10);
      
        // const [newUser, created] = await User.findOrCreate({
        //   where: { email },
        //   defaults: { 
        //     name: firstName,
        //     firstName: firstName,
        //     lastName: lastName,
        //     address: address,
        //     phonenumber: phonenumber,
        //     gender: gender === '1' ? true : false,
        //     roleId: roleId,
        //   },
        // });
        // if (created) {
        //   return res.status(201).json(newUser);
        // } else return res.status(400).json({ msg: "User already existed" });
        // //res.status(201).json(newUser);

  };
  

//   const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//       user: "onlinecvpr@hotmail.com",
//       pass: "123asdASD",
//     },
//   });
  
  const forgotpassword = async (req, res, next) => {
    const { email } = req.body;
    let message = await userService.forgotpassword(email);
    return res.status(200).json(message);
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const { email } = req.body;
    //     const validUser = await User.findOne({ where: { email } });
    //     if (!validUser)
    //       return next(errorHandler(404, "No user created with this email!"));
    //     const token =
    //       ({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    //     const link = `<a href=localhost:3000/resetpassword/${validUser.id}/${token}>ResetPassword</a>`;
    
    //     const resetmail = {
    //       from: "onlinecvpr@hotmail.com",
    //       to: validUser.email,
    //       subject: "Reset password request",
    //       text: "Your password can be reset by clicking Reset password link below, the link will be expired after 15m\nIf you did not request, please ignore this email.",
    //       html: link,
    //     };
    
    //     transporter.sendMail(resetmail);
    //     console.log(email, id, "reset password");
    //     res.status(
    //       200,
    //       "A reset password link has been sent to your email to reset your password"
    //     );
    //   } catch (err) {
    //     next(err);
    //   }
    // })
  };
  
  const resetpassword = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, token } = req.params;
        const { password } = req.body;
        console.log(id, password, token);
        const hashPassword = bcryptjs.hashSync(password, 10);
        jwt.verify(token, process.env.JWT_SECRET);
        const update = await User.update(
          { password: hashPassword },
          { where: { id: id } }
        );
        if (!update)
          return next(errorHandler(500, "update failed, please try again later."));
        res.status(200, "You have successfully change your password");
      } catch (err) {
        next(err);
      }
    })
  };
  
  const handleEditUser = async (req, res, next) => {
    if (!req.body){
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required paremeters!"
      })
    }
    let message = await userService.handleEditUser(req.body);
    return res.status(200).json(message);
  };

  const handleDeleteUser = async (req, res, next) => {
    if (!req.body.id){
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required paremeters!"
      })
    }
    const id  = req.body.id;
    let message = await userService.handleDeleteUser(id);
    console.log("check message: ");
    return res.status(200).json(message);
  };
  let getAllCode = async (req,res) => {
    try{
        let data = await userService.getAllCodeService(req.query.type);
        console.log(data);
        return res.status(200).json(data);
    }catch(e){
        console.log('get all code error: ', e)
        return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
        })
    }
  }

module.exports = {
    handleEditUser,
    handleDeleteUser,
    handleLoging,
    handleGetAllUser,
    signup,
    forgotpassword,
    resetpassword,
    getAllCode
}