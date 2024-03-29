import * as optionsService from "../../services/optionsService.js"
import * as questionsService from "../../services/questionsService.js"
import { validasaur } from "../../deps.js"

const validationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
}

const getOptionData = async (request) => {
    //getting option data from the request body
    const body = request.body({ type: "form" });
    const params = await body.value;
    let is_correct = false
    if(params.get("is_correct")){
        is_correct = true
    }
    return {
      is_correct: is_correct,
      option_text: params.get("option_text"),
    };
 };

const postOption = async ({request, response, render, state, params}) => {
    //getting option data
    const optionData = await getOptionData(request)
    optionData.question_id = params.id

    const [passes, errors] = await validasaur.validate(optionData,validationRules)
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }


    if(!passes){
        let data = {
            error: "Please, make sure to write the option text",
        }
        render("singleQuestion.eta",data)

        return
    } else {
        let question = (await questionsService.getQuestionById(optionData.question_id))[0]
        if(user_id !== question.user_id){
            let data = {
                error: "Sorry, but you can't add options to questions not created by you",
            }
            render("singleQuestion.eta",data)
            return
        }
        await optionsService.addOption(
            optionData.question_id, optionData.option_text, optionData.is_correct
        );
        response.redirect("/questions")
    }
    let path = "/questions/" + optionData.question_id
    response.redirect(path);
}

const deleteOption = async ({render, request, params, response, state}) => {
    //getting user information for later check
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }
    //getting question and option information
    const question_id = params.questionId
    const option_id = params.optionId
    let question = (await questionsService.getQuestionById(question_id))[0]
    if(user_id !== question.user_id){
        //checking user has the right to do the operation
        let data = {
            error: "Sorry, but you can't delete options from questions not created by you",
        }
        render("singleQuestion.eta",data)
        return
    } else {
        await optionsService.deleteOption(option_id)
        //creating the path for redirection
        let path = "/questions/" + question_id
        response.redirect(path)
    }
}

export { postOption, deleteOption }