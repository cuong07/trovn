import Logger from "../utils/logger.utils.js";
/**
 * @param {Request} req
 * @param {Response} res
 */
const accessLogger = (req, res, next) => {
    const ip = req.ip; // Lấy địa chỉ IP của client
    const day = new Date().getDay();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const hours = String(new Date().getHours()).padStart(2, "0");
    const minutes = String(new Date().getMinutes()).padStart(2, "0");
    const seconds = String(new Date().getSeconds()).padStart(2, "0");
    Logger.info(
        `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} - ${ip} - ${
            req.method
        } ${req.url} - ${JSON.stringify(req.body)}`
    );
    next();
};

export { accessLogger };
