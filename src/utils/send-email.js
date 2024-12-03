import nodemailer from "nodemailer";
import { ResponseError } from "../error/error.js";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    // host: process.env.PROD_MAIL_HOST,
    // port: process.env.PROD_MAIL_PORT,
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
    // ignoreTLS: true,
});

const sendEmail = async (receipient, subject, message) => {
    try {
        const info = transporter.sendMail({
            from: '"DermaScan Admin" <dermascan@demomailtrap.com>', // sender address
            to: "receipient", // list of receivers
            subject: subject, // Subject line
            message: message, // plain text body
            html: `<p>Please use the Token to reset your password before 10 minutes, Here is your token:</p> <b> ${message}</b>`, // html body
        });
        return info;
    } catch (error) {
        return new ResponseError(500, error.message);
    }
};

export { sendEmail };
