import { logger } from "../config/winston.js";
import ReportModel from "../models/report.model.js";
import { sendMail } from "../utils/mailer.utils.js";
import { warningTemplate } from "../utils/warning.template.js";
import UserService from "./user.service.js";

const ReportService = {
    async createReport(data) {
        try {
            return await ReportModel.methods.createReport(data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findAllReportActive() {
        try {
            return await ReportModel.methods.findAllReportActive();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findAllReportInProcess() {
        try {
            return await ReportModel.methods.findAllReportInProcess();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findAllReportByReporterId(userId) {
        try {
            return await ReportModel.methods.findAllReportByReporterId(userId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async findAllReportByReportedId(userId) {
        try {
            return await ReportModel.methods.findAllReportByReportedId(userId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async updateReport(id, data) {
        try {
            return await ReportModel.methods.updateReport(id, data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async deleteReport(id) {
        try {
            return await ReportModel.methods.deleteReport(id);
        } catch (error) {
            logger.error(error);
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
            logger.error(error);
            throw error;
        }
    },

    async accept(id, userId) {
        try {
            const user = await UserService.getUserById(userId);
            if (user) {
                await UserService.updateUser(userId, {
                    violationCount: user.violationCount + 1,
                });
            }
            let template = warningTemplate(
                user.email,
                `Vi phạm quy tắc cộng đông đây là vi phạm lần thư 0${
                    user.violationCount + 1
                } nếu tiếp tục vi phạm 0${
                    3 - (user.violationCount + 1)
                } tài khoản của bạn sẽ bị khóa`
            );
            sendMail(user.email, "CẢNH BÁO VI PHẠM", template);
            return await this.updateReport(id, { isActive: false });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },

    async refuse(id) {
        try {
            return await this.updateReport(id, { isActive: false });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    },
};

export default ReportService;
