const otpGenerator = require('otp-generator');
const OTP_CONFIG= {
  upperCaseAlphabets: true,
  specialChars: false,
}
const OTP_LENGTH=6
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

// The OTP_LENGTH is a number, For my app i selected 10.
// The OTP_CONFIG is an object that looks like 
