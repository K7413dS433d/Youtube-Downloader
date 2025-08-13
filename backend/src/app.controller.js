import cors from "cors";
import youtubeRouter from './modules/youtube/youtube.controller.js';
import { globalError, notFound } from './utils/index.js';


export const bootstrap = (app, express) => {
    // Initialize your application here

    //unexpected errors handler
    process.on("uncaughtException", (err) => {
        console.log(err);
    });

    app.use(cors())

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('app working now');
    });

    //youtube downloader controller
    app.use("/youtube", youtubeRouter)


    // Handle errors
    app.all("*error", notFound)

    //unexpected errors handler
    process.on("unhandledRejection", (err) => {
        console.log(err);
    });


    //global error handling
    app.use(globalError);

};
