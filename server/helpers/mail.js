const mailgun = require("mailgun-js");

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mg = mailgun({ apiKey, domain });

const mailer = {

}

mailer.sendEmailConfirmationLink = async (to, code) => {
  const data = {
    to,
    from: "loi@coderschool.vn",
    subject: "Please confirm your email",
    text: `Please click this link to confirm your email: http://localhost:5000/api/users/verify?code=${code}`,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};


module.exports = mailer 