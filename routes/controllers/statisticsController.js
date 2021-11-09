import * as statisticsService from "../../services/statisticsService.js"

const showStatistics = async ({render, request, state, response }) => {
    let data = {}
    data.topUsers = (await statisticsService.findFiveUsersWithMostAnswers()).reverse()
    console.log(data)
    render("/statistics.eta",data)
}

export { showStatistics }