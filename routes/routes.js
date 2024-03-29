import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js"
import * as questionsController from "./controllers/questionsController.js"
import * as optionsController from "./controllers/optionsController.js"
import * as quizController from "./controllers/quizController.js"
import * as statisticsController from "./controllers/statisticsController.js"
import * as apiController from "./apis/apiController.js"

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
router.get("/quiz/:id", quizController.getQuestionById)
router.post("/quiz/:id/options/:optionId", quizController.answerQuestion)
router.get("/quiz/:id/correct", quizController.showCorrect)
router.get("/quiz/:id/incorrect", quizController.showIncorrect)
router.get("/statistics",statisticsController.showStatistics)
router.get("/api/questions/random", apiController.getRandomQuestion)
router.post("/api/questions/answer", apiController.answerQuestion)

export { router };
