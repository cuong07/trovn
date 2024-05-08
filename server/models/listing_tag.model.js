import db from "../lib/db.js";

const ListingTag = {
    fields: {
        id: {
            type: "String",
            primaryKey: true,
            unique: true,
        },
        listingId:{
            type: "String",
            foreignKey: "Listing.id",
        },
        tagId:{
            type: "String",
            foreignKey: "Tag.id",
        },
    },

    methods: {
        async getTags(listingId) {
            return await db.listingTag.findMany({
                where: { listingId: listingId },
                select: {
                    id: true,
                    tagId: true,
                },
            });
        },

        async insertListingTag(listingTagData){
            return await db.listingTag.create({
                data: listingTagData,
            });
        },

        async deleteListingTag(listingTagId){
            return await db.listingTag.delete({
                where: {id: listingTagId},
            })
        },
    },
};

export default ListingTag;