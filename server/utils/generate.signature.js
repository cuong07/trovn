import crypto from "crypto";

export function generateSignature(data, secretKey) {
    const sortedKeys = Object.keys(data).sort();

    let dataString = "";
    for (let i = 0; i < sortedKeys.length; i++) {
        const key = sortedKeys[i];
        const value = data[key];
        dataString += `${key}=${value}&`;
    }
    dataString = dataString.substring(0, dataString.length - 1);

    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(dataString);
    const signature = hmac.digest("hex");

    return signature;
}
