import { lang } from "moment";
import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService";

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType || !data.fullname) {
                resolve({
                    errCode: -1,
                    message: "Missing required parameters"
                });
            }
            else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullname,
                    doctorName: data.doctorName,
                    time: data.timeString,
                    language: data.language,
                    redirectLink: 'https://google.com',
                })

                // Check User exist in DB
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                // Create Booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    });
                }

                resolve({
                    errCode: 0,
                    message: "Save infor patient booking successfully"
                });

            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    postBookAppointment: postBookAppointment
}