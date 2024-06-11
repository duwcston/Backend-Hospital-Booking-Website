require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Toan Nguyen 👻" <no.relpy@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: getSubject(dataSend), // Subject line
        // text: "Hello world?",
        html: getBodyHTMLEmail(dataSend)  // html body
    });
};

let getSubject = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = 'Xác nhận đặt lịch khám ✔';
    }
    if (dataSend.language === 'en') {
        result = 'Confirm Booking Email ✔';
    }
    return result;
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = 
        `
        <h2>Xin chào ${dataSend.patientName}!</h2>
        <p>Đây là email xác nhận đặt lịch khám tại phòng khám của chúng tôi</p>
        <p>Thông tin đặt lịch của bạn:</p>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Thời gian: ${dataSend.time}</b></div>

        <p>Nếu thông tin chính xác, vui lòng click vào link bên dưới để xác nhận đặt lịch</p>
        <a href=${dataSend.redirectLink} target="_blank">Xác nhận đặt lịch</a>

        <p>Nếu có bất kỳ thắc mắc nào, vui lòng trả lời email này</p>

        <div>Cảm ơn bạn đã chọn dịch vụ của chúng tôi!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
        `
        <h2>Dear ${dataSend.patientName}!</h2>
        <p>This is an email to confirm your booking at our clinic</p>
        <p>Your booking information:</p>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <div><b>Time: ${dataSend.time}</b></div>

        <p>If the information is correct, please click the link below to confirm your booking</p>
        <a href=${dataSend.redirectLink} target="_blank">Confirm Booking</a>

        <p>If you have any questions, please reply to this email</p>

        <div>Thank you for choosing our service!</div>
        `
    }

    return result;
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}