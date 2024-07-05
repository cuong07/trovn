import db from "../lib/db.js";

const ReportModel = {
    methods: {
        async createReport(data) {
            return db.report.create({
                data,
            });
        },

        async findAllReportActive() {
            return db.report.findMany({
                where: {
                    isActive: true,
                },
            });
        },
        async findAllReportInProcess() {
            return db.report.findMany({
                where: {
                    isProcess: true,
                },
            });
        },

        async findAllReportByReporterId(userId) {
            return db.report.findMany({
                where: {
                    reporterId: userId,
                },
            });
        },

        async findAllReportByReportedId(userId) {
            return db.report.findMany({
                where: {
                    reporterUser: userId,
                },
            });
        },

        async updateReport(id, data) {
            return db.report.findMany({
                where: {
                    id,
                },
                data,
            });
        },

        async deleteReport(id) {
            return db.report.delete({
                where: {
                    id,
                },
            });
        },
    },
};
