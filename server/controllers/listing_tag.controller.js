import ListingTagService from "../services/listing_tag.service";
import { statusCode } from "../config/statusCode";

const ListingTagController = {
    async getListingTags(req, res){
        const listingId = req.params.id;
        try{
            const listingTags = await ListingTagController.getTags(listingId);
            if(!listingTags){
                return res
                    .statusCode(statusCode.NOT_FOUND)
                    .json({error: "ListingTags not found"});
            }
            return res.status(statusCode.OK).json(listingTags);
        }catch(error){
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json({message: "Internal server error"});
        }
    },
}