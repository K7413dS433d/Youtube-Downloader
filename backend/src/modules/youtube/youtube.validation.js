import joi from "joi";

export const downloadYoutubeVideo = joi.object({
    v: joi.string().uri().required(),
    q: joi.string().valid("264", "247", "135", "134", "highestaudio").default("264")
});
