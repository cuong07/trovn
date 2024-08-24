import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "./config/winston.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// const cpuCount = os.cpus().length;
const cpuCount = 4;

logger.info("CPU count: " + cpuCount);
logger.info("primary pid: " + process.pid);

cluster.setupPrimary({
    exec: __dirname + "/index.js",
});

for(let i = 0; i < cpuCount; i++){
    cluster.fork();
}

cluster.on("exit", (worker, node, signal) => {
    logger.info(`Worker ${worker.process.pid} has been killed`)
    logger.info("Starting another worker");
    cluster.fork();
})