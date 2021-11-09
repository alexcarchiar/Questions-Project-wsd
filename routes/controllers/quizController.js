import * as optionsService from "../../services/optionsService.js"
import * as questionsService from "../../services/questionsService.js"
import * as answerService from "../../services/answerService.js"

const getRandomQuestion = async ({ params, response }) => {
    const id = params.id
    const question = await questionsService.getRandomQuestion(id)
    if(question === undefined){
        response.body = "There are no questions so far in the database"
    } else {
        const path = "/quiz/" + question.id
        response.redirect(path)
    }
}

const getQuestionById = async ({ render, params, response }) => {
    const questionId = params.id
    const question = (await questionsService.getQuestionById(questionId))[0]

    if(question === undefined){
        response.body = "The question you're looking for does not exist"
        return
    } else {
        let data = {
            question: question,
            options: await optionsService.getOptions(questionId)
        }
        render("quiz.eta", data)
    }
}

const answerQuestion = async ({ params, response, state }) => {
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }
    const question_id = params.id
    const option_id = params.optionId
    const option = (await optionsService.getOptionById(option_id))[0]
    if(option.is_correct){
        await answerService.addAnswer(user_id,question_id,option_id,true)
        let path = "/quiz/" + question_id + "/correct"
        response.redirect(path)
    } else {
        await answerService.addAnswer(user_id,question_id,option_id,false)
        let path = "/quiz/" + question_id + "/incorrect"
        response.redirect(path)
    }


}

const showCorrect = ({render}) => {
    render("correct.eta")
}
const showIncorrect = async ({ render, params, response, request, state }) => {
    const question_id = params.id
    const options = (await optionsService.getOptions(question_id))
    let data = {
        option: undefined,
    }
    options.forEach(el => {
        if(el.is_correct === true){
            data.option = el
        }
    })
    render("incorrect.eta",data)
}

export { getRandomQuestion, getQuestionById, answerQuestion, showCorrect, showIncorrect }