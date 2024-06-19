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

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Đây là email gửi tới bạn về đơn thuốc của bác sĩ</p>
        <p>Thông tin đơn thuốc của bạn được gửi trong file đính kèm.</p>

        <div>Cảm ơn bạn đã chọn dịch vụ của chúng tôi!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>This is an email to send you the prescription of the doctor</p>
        <p>Your prescription information is sent in the attached file.</p>

        <div>Thank you for choosing our service!</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD
                },
            });

            let info = await transporter.sendMail({
                from: '"Toan Nguyen 👻" <no.reply@gmail.com>',
                to: dataSend.email,
                subject: getSubjectRemedy(dataSend),
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        // content: dataSend.imageBase64.split("base64,")[1],
                        content: dataSend.imageBase64,
                        encoding: 'base64'
                    }
                ]
            });
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
}


let getSubjectRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = 'Đơn thuốc ✔';
    }
    if (dataSend.language === 'en') {
        result = 'Prescription ✔';
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}