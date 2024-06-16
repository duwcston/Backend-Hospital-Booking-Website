const db = require('../models');

let createClinic = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (!data || data.length === 0) {
                resolve({
                    errCode: -1,
                    errMessage: 'Cannot find any Clinic'
                })
            }
            if (data && data.length > 0) {
                data.map(item => {
                    item.dataValues.image = Buffer.from(item.dataValues.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: data
            });
        }
        catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicById = async (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = {};
                    data = await db.Clinic.findOne({
                        where: { id: inputId },
                        attributes: ['name','address','descriptionHTML', 'descriptionMarkdown'],
                    });
                    if (data) {
                        let doctorClinic = [];
                    
                        doctorClinic = await db.Doctor_Infor.findAll({
                            where: { ClinicId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })
                       
                        data.dataValues.doctorClinic = doctorClinic;
                    }
                    else {
                        data = {};
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        data
                    });
              
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}