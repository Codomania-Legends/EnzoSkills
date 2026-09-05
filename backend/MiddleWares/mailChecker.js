// muvg rxqc emuq pkjs

const nodemailer = require("nodemailer");
const nanoid = require("nanoid")

const email = "anshul.dev.app@gmail.com"
const pass = "muvg rxqc emuq pkjs"

const emailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: pass
    }
});

module.exports

module.exports = function generateOtp(req, res) {
    const nanoid = nanoid(6);

    const emailData = {
        from: email,
        to: req.body.email,
        subject: "OTP Verfication for EnzoSkills",
        text: `${nanoid} Use This OTP to Verify Your Email Address, Valid For 10Minutes, Do Not Share This OTP With Anyone`
    }

    emailSender.sendMail(emailData, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })

    res.json({ message: "OTP sent successfully" })
}

