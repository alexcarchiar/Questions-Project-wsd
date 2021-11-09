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

const getQuestionById = async ({ render, params, response, request }) => {

}

export { getRandomQuestion }