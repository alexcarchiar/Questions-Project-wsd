import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"

const router = new Router();

router.get("/", mainController.showMain);
router.get("/auth/register", registrationController.showRegisterForm )
export { router };
