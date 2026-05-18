import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get("/test",(request: Request, response: Response) => {
    return response.json({ok: true});
});

// User Routes



export { router };