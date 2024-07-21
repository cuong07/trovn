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

        async findAll(
            isActive,
            isProcess,
            reporterId,
            reporterUser,
            page,
            limit
        ) {
            const currentPage = +page || 1;
            const take = +limit || 10;

            const filters = {};
            if (isActive) {
                filters.isActive = Boolean(isActive);
            }
            if (isProcess) {
                filters.isProcess = isProcess;
            }
            if (reporterId) {
                filters.reporterId = reporterId;
            }
            if (reporterUser) {
                filters.reporterUser = reporterUser;
            }
            const [totalElement, contents] = await db.$transaction([
                db.report.count({
                    where: filters,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
                db.report.findMany({
                    take,
                    skip: Math.max(0, (currentPage - 1) * take),
                    where: filters,
                    include: {
                        reportedUser: {
                            select: {
                                address: true,
                                id: true,
                                fullName: true,
                                avatarUrl: true,
                                email: true,
                                phoneNumber: true,
                                username: true,
                            },
                        },
                        reporterUser: {
                            select: {
                                address: true,
                                id: true,
                                fullName: true,
                                avatarUrl: true,
                                email: true,
                                phoneNumber: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
            ]);

            const totalPage = Math.ceil(totalElement / take);
            return { totalElement, currentPage, totalPage, contents };
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
            return db.report.update({
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

export default ReportModel;
