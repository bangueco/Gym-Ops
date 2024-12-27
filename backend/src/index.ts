import logger from "@lib/utils/logger";
import app from "./app";
import config from "@lib/utils/config";

app.listen(config.port, () => {
  logger.info(`Server running at PORT: ${config.port}`);
});