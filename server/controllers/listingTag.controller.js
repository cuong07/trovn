import ListingTagService from "../services/listingTag.service.js";
import { statusCode } from "../config/statusCode.js";
import { BaseResponse } from "../responses/BaseResponse.js";
import TagService from "../services/tag.service.js";

const ListingTagController = {
    async getListingTagsByListingId(req, res){
        const listingId = req.params.id;
        try {
            const existedtListingTag = await ListingTagService.getListingTagByListingId(listingId);
            if(!existedtListingTag){
                return res
                    .status(statusCode.NOT_FOUND)
                    .json({error: `ListingTag with listingId ${listingId} does not existed`})
            }
            const listingTags = await ListingTagService.getListingTagsByListingId(listingId);
            return res
                .status(statusCode.OK)
                .json(BaseResponse.success("Successfully", listingTags))
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: "Tnternal server error"});
        }
    },

    async createListingTag(req, res){
        const listingId = req.params.id;
        try {
            const tag = await TagService.getTagByName(req.body.tagName);
            const listingTagData = {listingId: req.params.id, tagId: tag.id};
            const newListingTag = await ListingTagService.createListingTag(listingTagData);
            return res.status(statusCode.OK).json(BaseResponse.success("Create a new listingTag successfully", newListingTag));
        } catch (error) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .json(BaseResponse.error(error.message, error));
        }
        //return res.status(statusCode.OK).json(BaseResponse.success("vao router listing/:id/listingTag"))
    }
}

export default ListingTagController;