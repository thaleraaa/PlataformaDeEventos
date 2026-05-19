import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { EditUserController } from "./controllers/User/EditUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get("/test",(request: Request, response: Response) => {
    return response.json({ok: true});
});

// User Routes
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/user/me', isAuthenticated, new DetailUserController().handle);
router.put('/user/edit', isAuthenticated, new EditUserController().handle);
router.delete('/user/remove', isAuthenticated, new DeleteUserController().handle);

export { router };