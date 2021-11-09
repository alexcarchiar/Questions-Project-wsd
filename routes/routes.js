import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js"
import * as questionsController from "./controllers/questionsController.js"
import * as optionsController from "./controllers/optionsController.js"
import * as quizController from "./controllers/quizController.js"

const router = new Router();

router.get("/", mainController.showMain);
router.get("/auth/register", registrationController.showRegisterForm )
router.post("/auth/register", registrationController.registerUser)
router.get("/auth/login", loginController.showLoginForm)
router.post("/auth/login", loginController.login)
router.get("/questions", questionsController.showQuestionForm)
router.post("/questions", questionsController.postQuestion)
router.get("/questions/:id", questionsController.showSingleQuestion)
router.post("/questions/:id/options", optionsController.postOption)
router.post("/questions/:questionId/options/:optionId/delete", optionsController.deleteOption)
router.post("/questions/:id/delete", questionsController.deleteQuestion)
router.get("/quiz", quizController.getRandomQuestion)
export { router };
