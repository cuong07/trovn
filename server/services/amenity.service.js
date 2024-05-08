import fs from "fs";

import AmenityModel from "../models/amenity.model.js";
import { uploader } from "../utils/uploader.js";

const AmenityService = {
  async getAllAmenity() {
    try {
      return await AmenityModel.methods.findAllAmenity();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async createAmenity(AmenityData) {
    try {
      const { name, description, file } = AmenityData;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      console.log(newPath);
      const newAmenity = {
        name,
        description,
        iconUrl: newPath.id,
      };
      return await AmenityModel.methods.createAmenity(newAmenity);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async udpateAmenity(AmenityId, updatedData) {
    try {
      const { name, description, file } = updatedData;
      if (file) {
        const { path } = file;
        const newPath = await uploader(path);
        fs.unlinkSync(path);
        const newAmenity = {
          name,
          description,
          iconUrl: newPath.id,
        };
        return await AmenityModel.methods.updateAmenity(AmenityId, newAmenity);
      } else {
        return await AmenityModel.methods.updateAmenity(AmenityId, {
          name,
          description,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteAmenity(AmenityId) {
    try {
      return await AmenityModel.methods.deleteAmenity(AmenityId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default AmenityService;

// const updatedListing = await prisma.listing.update({
//     where: { id: listingId },
//     data: {
//       Amenitys: {
//         connect: AmenityIds.map(id => ({ id })),
//       },
//     },
//   });
