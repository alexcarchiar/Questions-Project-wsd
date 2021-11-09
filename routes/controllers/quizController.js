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

const answerQuestion = async ({ render, params, response, request, state }) => {
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }
}

const showCorrect = ({render}) => {
    render("correct.eta")
}
const showIncorrect = async ({ render, params, response, request, state }) => {
    const question_id = params.id
    const options = (await optionsService.getOptions(question_id))
    console.log(options)
    let data = {
        option: undefined,
    }
    options.forEach(el => {
        console.log(el)
        if(el.is_correct === true){
            data.option = el
        }
    })
    console.log(data)
    render("incorrect.eta",data)
}

export { getRandomQuestion, getQuestionById, answerQuestion, showCorrect, showIncorrect }