const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "priyanjal362@gmail.com",
    pass: "gfrw gdrw cztu ixar"
  }
});

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
