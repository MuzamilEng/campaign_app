const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'julius2@ethereal.email',
				pass: 'QvHzdEHXZKvaRmzucq'
			}
		});
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

