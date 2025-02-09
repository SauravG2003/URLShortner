import express from 'express';
import { dataController, redirectController, urlController } from '../controllers/urlShortnerController.js';
const urlRoute = express.Router();

urlRoute.post("/shorten",urlController);
urlRoute.get("/:shortURL",redirectController);
urlRoute.get("/count/:shortURL",dataController);
export default urlRoute;