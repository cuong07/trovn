import cloudinary from "cloudinary";
import { extractPublicId } from "../utils/extract.publish.id.js";
import { logger } from "./winston.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    url: result.url,
                    id: result.public_id,
                });
            },
            {
                rexource_type: "auto",
                folder: folder,
            }
        );
    });
};

export const deleteImage = async (url) => {
    try {
        const publicId = extractPublicId(url);

        if (!publicId) {
            throw new Error("Public ID could not be extracted from the URL");
        }

        const result = await cloudinary.v2.uploader.destroy(publicId);
        logger.info("Image deleted successfully:", result);
    } catch (error) {
        logger.error("Error deleting image:", error);
    }
};
