import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import ReportService from "../services/report.service.js";

const ReportController = {
    async create(req, res) {
        try {
            const data = req.body;
            const { user } = req;
            if (!user) {
                return res
                    .status(statusCode.BAD_REQUEST)
                    .json(BaseResponse.error("Vui lòng đăng nhập", null));
            }
            const newReport = {
                ...data,
                reporterId: user.id,
            };
            const report = await ReportService.createReport(newReport);
            return res
                .status(statusCode.CREATED)
                .json(BaseResponse.success("Thành công", report));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },
    async findAll(req, res) {
        try {
            const {
                isActive,
                isProcess,
                reporterId,
                reporterUser,
                page,
                limit,
            } = req.query;
            const data = await ReportService.findAll(
                isActive,
                isProcess,
                reporterId,
                reporterUser,
                page,
                limit
            );
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await ReportService.deleteReport(id);
            return res
                .status(statusCode.NO_CONTENT)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const report = req.body;
            const data = await ReportService.updateReport(id, report);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", data));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async accept(req, res) {
        try {
            const { userId } = req.body;
            const { id } = req.params;
            const report = await ReportService.accept(id, userId);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", report));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },

    async refuse(req, res) {
        try {
            const { id } = req.params;
            const report = await ReportService.refuse(id);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Thành công", report));
        } catch (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(BaseResponse.error(error.message, error));
        }
    },
};

export default ReportController;
