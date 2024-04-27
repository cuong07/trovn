import ListingTagModel from "../models/listing_tag.model";

const ListingTagService = {
    async getListingTags(listingId){
        try{
            return await ListingTagModel.getListingTags(listingId);
        }catch(error){
            throw new Error(`Error while getting ListingTags by listingId: ${listingId}`);
        }
    }
}