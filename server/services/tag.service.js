import TagModel from '../models/tag.model.js';

const TagService = {
    async getTags(){
        try {
            return await TagModel.methods.getTags();
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async createTag(tagData){
        try {
            const existingTag = await TagModel.methods.getTagByName(tagData.name);
            if(!existingTag){
                await TagModel.methods.createTag(tagData);
            }else
                throw "Name existed, please choose a other tag name";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default TagService;