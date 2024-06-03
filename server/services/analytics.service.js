import ListingModel from "../models/listing.model.js";
import LocationModel from "../models/location.model.js";
import PaymentModel from "../models/payment.model.js";
import User from "../models/user.model.js";

const AnalyticsService = {
    async getListingsForChart() {
        const today = new Date();
        // TODO: Tạo một bản sao của today
        const thirtyDaysAgo = new Date(today);
        // TODO: Trừ đi 30 ngày từ today
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const dataForChart = {
            labels: [],
            data: [],
            label: "Danh sách số phòng được thêm mới trong 30 ngày qua",
        };

        for (let i = 0; i <= 30; i++) {
            const startOfDay = new Date(thirtyDaysAgo);
            startOfDay.setDate(thirtyDaysAgo.getDate() + i);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(startOfDay);
            endOfDay.setDate(startOfDay.getDate() + 1);
            endOfDay.setHours(0, 0, 0, 0);
            // TODO: lấy data từ db
            const count = await ListingModel.methods.countListingsByDate(
                startOfDay,
                endOfDay
            );

            const formattedDate = startOfDay.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
            });

            dataForChart.labels.push(formattedDate);
            dataForChart.data.push(count);
        }

        return dataForChart;
    },

    async getAmountPayment() {
        try {
            const today = new Date();
            // TODO: Bắt đầu của tháng hiện tại
            const thisMonthStart = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );
            thisMonthStart.setHours(0, 0, 0, 0);
            // TODO: Bắt đầu của tháng trước
            const lastMonthStart = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            );
            lastMonthStart.setHours(0, 0, 0, 0);
            // TODO: Kết thúc của tháng hiện tại
            const thisMonthEnd = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0
            );
            thisMonthEnd.setHours(23, 59, 59, 999);
            // TODO: Kết thúc của tháng trước
            const lastMonthEnd = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );
            lastMonthEnd.setHours(23, 59, 59, 999);

            const thisMonthData =
                await PaymentModel.methods.findManyPaymentByDate(
                    thisMonthStart,
                    thisMonthEnd
                );
            const lastMonthData =
                await PaymentModel.methods.findManyPaymentByDate(
                    lastMonthStart,
                    lastMonthEnd
                );
            const totalAmountThisMonth = thisMonthData.reduce(
                (acc, curr) => acc + curr.amount,
                0
            );
            const totalAmountLastMonth = lastMonthData.reduce(
                (acc, curr) => acc + curr.amount,
                0
            );
            const percent =
                ((totalAmountThisMonth - totalAmountLastMonth) /
                    totalAmountLastMonth) *
                100;

            return {
                thisMonth: totalAmountThisMonth,
                lastMonth: totalAmountLastMonth,
                percent,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getCountNewUserRegister() {
        try {
            const today = new Date();
            // TODO: Bắt đầu của tháng hiện tại
            const thisMonthStart = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );
            thisMonthStart.setHours(0, 0, 0, 0);
            // TODO: Bắt đầu của tháng trước
            const lastMonthStart = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            );
            lastMonthStart.setHours(0, 0, 0, 0);
            // TODO: Kết thúc của tháng hiện tại
            const thisMonthEnd = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0
            );
            thisMonthEnd.setHours(23, 59, 59, 999);
            // TODO: Kết thúc của tháng trước
            const lastMonthEnd = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );
            lastMonthEnd.setHours(23, 59, 59, 999);

            const thisMonth = await User.methods.findManyUserByDate(
                thisMonthStart,
                thisMonthEnd
            );
            const lastMonth = await User.methods.findManyUserByDate(
                lastMonthStart,
                lastMonthEnd
            );
            const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
            return {
                thisMonth,
                lastMonth,
                percent,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getTop10UsersWithMostListings() {
        try {
            const data =
                await ListingModel.methods.findTop10UsersWithMostListings();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getCountListingByLocationForChart() {
        try {
            const locations = await LocationModel.methods.getLocations();
            const locationPromises = locations?.contents?.map(
                async (location) => {
                    const count =
                        await ListingModel.methods.getCountListingByLocationId(
                            location.id
                        );
                    return { name: location.name, count };
                }
            );

            const locationData = await Promise.all(locationPromises);

            const dataForChart = {
                labels: locationData.map((location) => location.name),
                data: locationData.map((location) => location.count),
                label: "Listing count for location",
            };
            return dataForChart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default AnalyticsService;
