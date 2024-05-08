import db from "../lib/db.js";

const UserOtpModel = {
  methods: {
    async createUserOtp(userOtp) {
      return db.userOtp.create({
        data: userOtp,
      });
    },

    async getUserOtpActive(otp) {
      return db.userOtp.findFirst({
        where: {
          otp: otp,
          isActive: true,
        },
      });
    },

    async deleteUserOtp(otp) {
      return db.userOtp.update({
        where: {
          otp,
        },
        data: {
          isActive: false,
        },
      });
    },
  },
};

export default UserOtpModel;
