import db from "../lib/db.js";

const ImageModel = {
  methods: {
    async insertManyImage(listUrl) {
      return await db.image.createMany({
        data: listUrl,
        skipDuplicates: true,
      });
    },

    async insertImage(image) {
      return await db.image.create({
        data: image,
      });
    },

    async getImageById(imageId) {
      return await db.image.findUnique({
        where: {
          id: imageId,
        },
      });
    },

    async deleteImageById(imageId) {
      return await db.image.delete({
        where: {
          id: imageId,
        },
      });
    },
    async deleteImageListingId(listingId) {
      return await db.image.delete({
        where: { listingId: listingId },
      });
    },
  },
};

export default ImageModel;
