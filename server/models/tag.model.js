import db from "../lib/db.js";

const Tag = {
    fields: {
        id: {
            type: "String",
            primaryKey: true,
            unique: true,
        },
        name: {
            type: "String",
            unique: true,
        },
        description:{
            type: "String",
        },
    },

    methods: {
        async getTag(tagId){
            return await db.tag.findUnique({
                where: {id: tagId},
                select: {
                    id: true,
                    name: true,
                    descriptiopn: true,
                }
            })
        },

        async insertTag(tagData){
            return await db.tag.create({
                data: tagData,
            })
        },

        async updateTag(tagId, tagData){
            return await db.tag.update({
                where: {id: tagId},
                data: tagData,
            })
        },

        async deleteTag(tagId){
            return await db.tag.delete({
                where: {id: tagId},
            })
        }
    }
}