import ytdl from "@distube/ytdl-core";

//direct download
export const downloadYoutubeVideo = async (req, res, next) => {
    const { v, q } = req.query;
    console.log(q);

    if (!ytdl.validateURL(v)) {
        return next(new Error("Invalid YouTube URL", { cause: 400 }));
    }


    // Set headers so the browser downloads the file
    res.header("Content-Disposition", 'attachment; filename="video.mp4"');
    res.header("Content-Type", "video/mp4");

    // Determine filter
    const filter = (q == "highestaudio" ? "audioonly" : "audioandvideo");

    ytdl(v, {
        filter: filter,
        quality: q
    }).pipe(res);
}

// forwarder
export async function YoutubeVideoSource(req, res, next) {
    const { v } = req.query;

    if (!ytdl.validateURL(v)) {
        return next(new Error("Invalid YouTube URL", { cause: 400 }));
    }


    const info = await ytdl.getInfo(v);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest", filter: "audioandvideo" });

    // Redirect browser to the actual YouTube stream URL
    res.redirect(format.url);
}