import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { EditUserController } from "./controllers/User/EditUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";
import { CreateEventoController } from "./controllers/Eventos/CreateEventoController";
import { DetailEventoController } from "./controllers/Eventos/DetailEventoController";
import { DeleteEventoController } from "./controllers/Eventos/DeleteEventoController";
import { EditEventoController } from "./controllers/Eventos/EditEventoController";
import { CreateIngressoController } from "./controllers/Ingresso/CreateIngressoController";
import { FindByUserIngressoController } from "./controllers/Ingresso/FIndByUserIngressoController";
import { isAdmin } from "./middlewares/isAdmin";
import { FindAllEventosController } from "./controllers/Eventos/FindAllEventoController";
import { FindMyEventosController } from "./controllers/Eventos/FindMyEventosController";
import { GetImageEventoController } from "./controllers/Eventos/GetImageEventoController";

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


// Evento Routes
router.post('/evento', isAuthenticated, isAdmin, upload.single("file"), new CreateEventoController().handle);
router.get('/evento', isAuthenticated, isAdmin,  new DetailEventoController().handle);
router.put('/evento/edit', isAuthenticated, isAdmin, upload.single("file"), new EditEventoController().handle);
router.delete('/evento/remove', isAuthenticated, isAdmin, new DeleteEventoController().handle);
router.get('/eventos', isAuthenticated, new FindAllEventosController().handle);
router.get('/eventos/me', isAuthenticated, isAdmin, new FindMyEventosController().handle);
router.get('/evento/imagem', isAuthenticated, new GetImageEventoController().handle);


// Ingresso Routes
router.post('/ingresso', isAuthenticated, new CreateIngressoController().handle);
router.get('/ingressos', isAuthenticated, new FindByUserIngressoController().handle);

export { router };