const nodemailer = require('nodemailer');
const Settings = require("../models/settings");
const configMail = require('../config/config').mailer;
const sendMail = async (req, res, next) => {
	try	{
		const {text, title, replyTo} = req.body;

		if (!text || !title || !replyTo) return res.status(400).json({message: "Brak wymaganych danych"})
		const defConf = await Settings.findOne({id: 0}).select("contact");
		const sendTo = req.body?.sendTo || defConf.contact.email

		const transporter = nodemailer.createTransport({
			host: configMail.serverSMTP,
			port: configMail.port,
			auth: configMail.auth,
			disableFileAccess: true
		},
		{
			from: configMail.auth.user
		})

		let message = {
			replyTo: replyTo,
			subject: title,
			to: sendTo,
			text: text
		}
		console.log(message)
		await transporter.sendMail(message, (err) => {
			if (err){
				return res.status(500).json({message: "Wiadomość nie dostarczona"})
			}
			return res.status(200).json({message: "Wysłano"})
		})

	} catch (e) {
		next(e)
	}
}

module.exports = {sendMail}