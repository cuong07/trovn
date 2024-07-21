import db from "../lib/db.js";

const ReviewModel = {
    methods: {
        async findAll(page, limit, listingId) {
            const currentPage = +page || 1;
            const take = limit ? +limit : undefined;
            const skip = take ? Math.max(0, (currentPage - 1) * take) : 0;
            const filters = {};
            if (listingId) {
                filters.listingId = listingId;
            }
            const [totalElement, contents] = await db.$transaction([
                db.review.count(),
                db.review.findMany({
                    where: filters,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        user: {
                            select: {
                                fullName: true,
                                address: true,
                                avatarUrl: true,
                                email: true,
                                id: true,
                                phoneNumber: true,
                            },
                        },
                    },
                    take,
                    skip,
                }),
            ]);
            const totalPage = take ? Math.ceil(totalElement / take) : 1;
            return { totalElement, currentPage, totalPage, contents };
        },
        async findHaveReview(listingId, userId) {
            return db.review.findFirst({
                where: {
                    userId,
                    listingId,
                },
            });
        },

        async create(data) {
            return await db.review.create({
                data,
            });
        },

        async delete(id) {
            return await db.review.delete({
                where: {
                    id,
                },
            });
        },

        async update(id, data) {
            return db.review.update({
                where: {
                    id,
                },
                data,
            });
        },
    },
};

export default ReviewModel;
