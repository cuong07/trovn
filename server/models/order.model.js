import db from "../lib/db.js";

const OrderModel = {
    methods: {
        async createOrder(data) {
            return db.orderItem.create({
                data: data,
            });
        },

        async getOrdersByUserId(userId) {
            console.log(userId);
            return db.orderItem.findMany({
                where: {
                    userId: userId,
                    // payment: {
                    //   isActive: true,
                    // },
                },
                include: {
                    advertisingPackage: true,
                    payment: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            address: true,
                            avatarUrl: true,
                            phoneNumber: true,
                            isPremium: true,
                            isVerify: true,
                            role: true,
                        },
                    },
                },
            });
        },

        async getOrderByAdsPackageId(id) {
            return db.orderItem.findMany({
                where: {
                    advertisingPackageId: id,
                },
                include: {
                    advertisingPackage: true,
                    payment: true,
                    user: true,
                },
            });
        },
    },
};

export default OrderModel;
