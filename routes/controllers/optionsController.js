import * as optionsService from "../../services/optionsService.js"
import { validasaur } from "../../deps.js"

const validationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
}

const getOptionData = async (request) => {
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

        await optionsService.addOption(
            optionData.question_id, optionData.option_text, optionData.is_correct
        );
        response.redirect("/questions")
    }
    let path = "/questions/" + optionData.question_id
    response.redirect(path);
}

export { postOption }