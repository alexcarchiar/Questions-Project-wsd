import * as statisticsService from "../../services/statisticsService.js"

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
    console.log(data)
    render("/statistics.eta",data)
}

export { showStatistics }