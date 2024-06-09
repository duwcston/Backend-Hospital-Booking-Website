import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json({
            infor
        });
    } catch (e) {
        console.log("Error: ", e);
        return res.status(500).json({
            errCode: -1,
            message: "Error from the server"
        });
    }
}

module.exports = {
    postBookAppointment: postBookAppointment
}