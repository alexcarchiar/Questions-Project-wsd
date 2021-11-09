import * as questionsService from "../../services/questionsService.js"
import * as optionsService from "../../services/optionsService.js"

const getRandomQuestion = async ({response}) => {
    let question = await questionsService.getRandomQuestion()

    question.answerOptions = await optionsService.getOptions(question.id)

    let data = {
        questionId: question.id,
        questionTitle: question.title,
        questionText: question.question_text,
        answerOptions: [],
    }
    question.answerOptions.forEach(el => {
        let d = {
            optionId: el.id,
            optionText: el.option_text,
        }
        data.answerOptions.push(d)
    })
    response.body = data
}

const answerQuestion = async ({ request, response}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    if(document.questionId && document.optionId){
        const option = (await optionsService.getOptionById(document.optionId))[0]

        if(option.is_correct){
            response.body = {
                correct: true,
            }
        } else {
            response.body = {
                correct: false,
            }
        }
    }
}

export { getRandomQuestion, answerQuestion}