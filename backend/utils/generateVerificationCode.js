module.exports.generateVerificationCode = function () {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
