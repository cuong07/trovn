import ReportModel from "../models/report.model.js";

const ReportService = {
    async createReport(data) {
        try {
            return await ReportModel.methods.createReport(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findAllReportActive() {
        try {
            return await ReportModel.methods.findAllReportActive();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findAllReportInProcess() {
        try {
            return await ReportModel.methods.findAllReportInProcess();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findAllReportByReporterId(userId) {
        try {
            return await ReportModel.methods.findAllReportByReporterId(userId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findAllReportByReportedId(userId) {
        try {
            return await ReportModel.methods.findAllReportByReportedId(userId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async updateReport(id, data) {
        try {
            return await ReportModel.methods.updateReport(id, data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async deleteReport(id) {
        try {
            return await ReportModel.methods.deleteReport(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async findAll(isActive, isProcess, reporterId, reporterUser, page, limit) {
        try {
            return await ReportModel.methods.findAll(
                isActive,
                isProcess,
                reporterId,
                reporterUser,
                page,
                limit
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default ReportService;
