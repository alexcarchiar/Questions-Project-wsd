import * as optionsService from "../../services/optionsService.js"
import * as questionsService from "../../services/questionsService.js"

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

const getQuestionById = async ({ render, params, response, request, state }) => {
    const questionId = params.id
    const question = (await questionsService.getQuestionById(questionId))[0]
    console.log(question)
    console.log(question.title)
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

export { getRandomQuestion, getQuestionById }