import otp from "otp-generator";

export const otpGenerator = (number) => {
  return otp.generate(number, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};
