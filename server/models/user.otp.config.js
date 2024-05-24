import db from "../lib/db.js";

const UserOtpModel = {
  methods: {
    async createUserOtp(userOtp) {
      return await db.userOtp.create({
        data: userOtp,
      });
    },

    async getUserOtpByEmailAndOtp(email, otp) {
      return db.userOtp.findFirst({
        where: {
          user: {
            email: email,
          },
          otp: otp,
          isActive: true,
        },
      });
    },

    async getUserOtpActive(otp) {
      return await db.userOtp.findFirst({
        where: {
          otp: otp,
          isActive: true,
        },
      });
    },

    async updateUserOtp(id, data) {
      return await db.userOtp.update({
        where: {
          id,
        },
        data,
      });
    },

    async deleteUserOtp(otp) {
      return await db.userOtp.update({
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
