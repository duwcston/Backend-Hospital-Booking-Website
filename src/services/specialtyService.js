const db = require('../models');

let createSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (!data || data.length === 0) {
                resolve({
                    errCode: -1,
                    errMessage: 'Cannot find any specialty'
                })
            }
            if (data && data.length > 0) {
                data.map(item => {
                    item.dataValues.image = Buffer.from(item.dataValues.image, 'base64').toString('binary');
                    return item;
                })
                console.log(data);
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

let getDetailSpecialtyById = async (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = {};
                // if (location === 'ALL') {
                    data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['descriptionHTML', 'descriptionMarkdown'],
                    });
                    if (data) {
                        let doctorSpecialty = [];
                        if (location === 'ALL') {
                            doctorSpecialty = await db.Doctor_Infor.findAll({
                                where: { specialtyId: inputId },
                                attributes: ['doctorId', 'provinceId'],
                            })
                        }
                        else {
                            // Find by location
                            doctorSpecialty = await db.Doctor_Infor.findAll({
                                where: { specialtyId: inputId, provinceId: location },
                                attributes: ['doctorId', 'provinceId'],
                            })
                        }
                
                        data.dataValues.doctorSpecialty = doctorSpecialty;
                    }
                    else {
                        data = {};
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        data
                    });
                // }
                // else {

                // }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}