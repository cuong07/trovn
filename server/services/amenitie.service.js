import fs from "fs";

import AmenitieModel from "../models/amenitie.model.js";
import { uploader } from "../utils/uploader.js";

const AmenitieService = {
  async getAllAmenitie() {
    try {
      return await AmenitieModel.methods.findAlllAmenitie();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async createAmenitie(amenitieData) {
    try {
      const { name, description, file } = amenitieData;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);
      console.log(newPath);
      const newAmenitie = {
        name,
        description,
        iconUrl: newPath.id,
      };
      return await AmenitieModel.methods.createAmenitie(newAmenitie);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async udpateAmenitie(amenitieId, updatedData) {
    try {
      const { name, description, file } = updatedData;
      if (file) {
        const { path } = file;
        const newPath = await uploader(path);
        fs.unlinkSync(path);
        const newAmenitie = {
          name,
          description,
          iconUrl: newPath.id,
        };
        return await AmenitieModel.methods.updateAmenitie(
          amenitieId,
          newAmenitie
        );
      } else {
        return await AmenitieModel.methods.updateAmenitie(amenitieId, {
          name,
          description,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteAmenitie(amenitieId) {
    try {
      return await AmenitieModel.methods.deleteAmenitie(amenitieId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default AmenitieService;

// const updatedListing = await prisma.listing.update({
//     where: { id: listingId },
//     data: {
//       amenities: {
//         connect: amenitieIds.map(id => ({ id })),
//       },
//     },
//   });
