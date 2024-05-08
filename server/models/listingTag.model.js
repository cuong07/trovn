import db from "../lib/db.js";

const ListingTag = {
    fields:{
        id: {
            type: "String",
            primatyKey: true,
            unique: true
        },
        listingId: {
            type: "String",
            foreignKey: "Listing.id"
        },
        tagId:{
            type: "String",
            foreignKey: "Tag.id"
        }
    },
    methods:{
        async getListingTagByListingId(listingId){
            return await db.listingTag.findFirst({
                where: {listingId: listingId},
                select:{
                    id: true,
                    listingId: true,
                    tagId: true
                }
            });
        },

        async getListingTagsByListingId(listingId){
            return await db.listingTag.findMany({
                where: {listingId: listingId},
                select:{
                    id: true,
                    listingId: true,
                    tagId: true
                }
            });
        },

        async createListingTag(listingTagData){
            return await db.listingTag.create({data: listingTagData});
        },

        async deleteListingTagById(listingTagId){
            return await db.listingTag.delete({ where: {id: listingTagId} });
        },

        async deleteListingTagByTagId(tagId){
            return await db.listingTag.delete({where: {tagId: tagId}});
        }
    }
}

export default ListingTag;