import * as questionsService from "../../services/questionsService.js"
import { validasaur } from "../../deps.js"

const validationRules = {
    title: [validasaur.minLength(1), validasaur.required],
    question_text: [validasaur.required, validasaur.minLength(1)],
}

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
      title: params.get("title"),
      question_text: params.get("question_text"),
    };
  };

const showQuestionForm = async ({ render, state }) => {
    
    const user_id = (await state.session.get("user")).id

    if(!user_id){
        response.redirect("/auth/login")
        return
    }
    let questions = await questionsService.getAllQuestionsForUser(user_id)
    let data = {
        rows: questions
    }
    render("addQuestionForm.eta",data)
}

const postQuestion = async ({request, response, render, state}) => {
    const questionData = await getQuestionData(request)
    const [passes, errors] = await validasaur.validate(questionData,validationRules)
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }


    if(!passes){
        let data = {
            error: "Please, make sure to write title and question text",
        }
        render("addQuestionForm.eta",data)

        return
    } else {

        await questionsService.addQuestion(
            user_id, questionData.title, questionData.question_text
        );
        response.redirect("/questions")
    }

  response.redirect("/questions");
}

export { showQuestionForm, postQuestion }