import express from 'express';
import { bootstrap } from './src/app.controller.js';
const PORT = process.env.PORT || 5000;

const app = express();


bootstrap(app, express);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});