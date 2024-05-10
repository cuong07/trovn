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
    description: {
      type: "String",
    },
  },
  methods: {
    async getTagByName(tagName) {
      return await db.tag.findFirst({
        where: { name: tagName },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    },
    async getTagById(tagId) {
      return await db.tag.findFirst({
        where: { id: tagId },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    },
    async getTags() {
      return await db.tag.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    },
    async createTag(tagData) {
      return await db.tag.create({ data: tagData });
    },
    async deleteTag(tagId) {
      return await db.tag.delete({ where: { id: tagId } });
    },
  },
};

export default Tag;
