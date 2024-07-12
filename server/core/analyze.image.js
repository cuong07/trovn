import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";

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
        console.log("IMAGE: ", imageUrl);
        const result = await computerVisionClient.analyzeImage(imageUrl, {
            visualFeatures: ["Adult"],
        });
        console.log("Adult content: ");
        console.log(`Is adult content: ${result.adult.isAdultContent}`);
        console.log(`Adult score: ${result.adult.adultScore}`);
        console.log(`Is racy content: ${result.adult.isRacyContent}`);
        console.log(`Racy score: ${result.adult.racyScore}`);
        return result.adult;
    } catch (error) {
        console.log("An error occurred:", error);
    }
}
