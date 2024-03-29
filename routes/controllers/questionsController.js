import * as questionsService from "../../services/questionsService.js"
import { validasaur } from "../../deps.js"
import * as optionsService from "../../services/optionsService.js"

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

const showSingleQuestion = async ({params, render }) => {
    const questionId = params.id
    const question = await questionsService.getQuestionById(questionId)
    if(question.length < 1){
        let data = {
            error: "Can't find the question"
        }
        render("singleQuestion.eta",data)
        return
    }
    let data = {
        question: question[0],
        options: await optionsService.getOptions(questionId),
    }
    render("singleQuestion.eta",data)
}

const deleteQuestion = async ({params, state, response, render}) => {
    //getting user information for later check
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }
    //getting question and option information
    const question_id = params.id
    let question = (await questionsService.getQuestionById(question_id))[0]
    if(user_id !== question.user_id){
        //checking user has the right to do the operation
        let data = {
            error: "Sorry, but you can't delete a question not created by you",
        }
        render("singleQuestion.eta",data)
        return
    } else {
        await questionsService.deleteQuestionById(question_id)
        //creating the path for redirection
        response.redirect("/questions")
    }
}

export { showQuestionForm, postQuestion, showSingleQuestion, deleteQuestion }