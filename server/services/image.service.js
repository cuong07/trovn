import fs from "fs";

import UserService from "./user.service.js";
import { uploader } from "../utils/uploader.js";
import ImageModel from "../models/image.model.js";

const ImageService = {
  async createManyImage(listUrl) {
    try {
      return await ImageModel.methods.insertManyImage(listUrl);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};
export default ImageService;
