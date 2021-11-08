import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js"

const router = new Router();

router.get("/", mainController.showMain);
router.get("/auth/register", registrationController.showRegisterForm )
router.post("/auth/register", registrationController.registerUser)
router.get("/auth/login", loginController.showLoginForm)

export { router };
