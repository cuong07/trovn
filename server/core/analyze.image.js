import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { logger } from "../config/winston.js";

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
        inHeader: {
            "Ocp-Apim-Subscription-Key":
                process.env.AZURE_COMPUTER_VISION_API_KEY,
        },
    }),
    process.env.AZURE_COMPUTER_VISION_ENDPOINT
);

export async function analyzeImage(imageUrl) {
    try {
        logger.info("IMAGE: ", imageUrl);
        const result = await computerVisionClient.analyzeImage(imageUrl, {
            visualFeatures: ["Adult"],
        });
        logger.info("Adult content: ");
        logger.info(`Is adult content: ${result.adult.isAdultContent}`);
        logger.info(`Adult score: ${result.adult.adultScore}`);
        logger.info(`Is racy content: ${result.adult.isRacyContent}`);
        logger.info(`Racy score: ${result.adult.racyScore}`);
        return result.adult;
    } catch (error) {
        logger.error("An error occurred:", error);
    }
}
