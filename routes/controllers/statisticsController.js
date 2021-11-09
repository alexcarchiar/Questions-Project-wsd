import * as statisticsService from "../../services/statisticsService.js"
import * as questionsService from "../../services/questionsService.js"

const showStatistics = async ({render, request, state, response }) => {
    //getting userId to be used for queries; asking for login otherwise
    const user_id = (await state.session.get("user")).id
    if(!user_id){
        response.redirect("/auth/login")
        return
    }

    //defining object to collect data
    let data = {}
    //finding top 5 users
    data.topUsers = (await statisticsService.findFiveUsersWithMostAnswers()).reverse()
    //getting num of answers for current user
    data.numAnswers = await statisticsService.getNumOfAnswers(user_id)
    //getting num of right answers for current user
    data.numRightAnswers = await statisticsService.getNumOfRightAnswers(user_id)
    //getting the num of answers to the user's questions
    const questions = await questionsService.getAllQuestionsForUser(user_id)
    let totNumReplies = 0

    for(let i = 0; i<questions.length; i++){
        let numReplies = await statisticsService.getNumOfAnswersForQuestion(questions[i].id)
        totNumReplies = numReplies + totNumReplies
    }

    data.numTotalAnswers = totNumReplies

    render("/statistics.eta",data)
}

export { showStatistics }