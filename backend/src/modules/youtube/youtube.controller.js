import { Router } from "express";
import * as downloaderService from "./youtube.service.js";
import * as downloaderSchema from "./youtube.validation.js";
import { asyncHandler } from "../../utils/index.js";
import { validateSchema } from "../../middlewares/index.js";

const youtubeRouter = Router();

youtubeRouter.get(
    "/download",
    validateSchema(downloaderSchema.downloadYoutubeVideo),
    asyncHandler(downloaderService.downloadYoutubeVideo)
);

youtubeRouter.get(
    "/source",
    validateSchema(downloaderSchema.downloadYoutubeVideo),
    asyncHandler(downloaderService.YoutubeVideoSource)
);

export default youtubeRouter;
