const GameGenerator=(teams, season)=>{
    
    
    let premierLeagueTeams = []
    let championshipTeams =[]
    let datesForMatches ;
    let premierLeagueDates;
    let championshipDates ;
    let matchesForPremierLeagueTeams;
    let matchesForChampionshipTeams ;


    const generateDates = (numberOfTeams)=>{
        const allDates = []
        let year, month, day;
        day = 21
        month = 9
        year = 2022
        for(let i=0; i<(2 * (numberOfTeams-1)); i++){
            day += 7
            if(day > 30){
                month++
                
                day = day - 30

                if(month > 12){
                     year++
                     month = 1
                }
            }
            console.log("year" , year, "month", month, "day", day)
           let dateString = `${year}-${month}-${day}`
           console.log(dateString)
           let newDate = new Date (dateString) 
           allDates.push(newDate)
        }
        return allDates
    }
    const getTeamsByleague=()=>{
        for(let team of teams){
            if(team.league.id === 2){

                premierLeagueTeams.push(team)
            }else{
                championshipTeams.push(team)
            }

        }
    }

     const createMatchesForTeams=(leagueTeams, dates)=>{
        const tempMatchesForLeague = []
        const tempMatchesForLeagueWithDates = []
        let duplicateTeams = []
        for(let teamA of leagueTeams){
            for(let teamB of leagueTeams){
                if(teamA !== teamB){
                    tempMatchesForLeague.push({teamHome:teamA, teamAway: teamB, finished: false, teamHomeGoals: 0, teamAwayGoals:0, league: teamA.league, season: season })
                    
                }
            }
        }
        for(let i=0; i <(2*(leagueTeams.length-1)); i++){

            for(let match of tempMatchesForLeague){
                if(!duplicateTeams.includes(match.homeTeam) && !duplicateTeams.includes(match.awayTeam)){
                    match.date = dates[i]
                    duplicateTeams.push(match.homeTeam)
                    duplicateTeams.push(match.awayTeam)
                    tempMatchesForLeagueWithDates.push(tempMatchesForLeague.splice(tempMatchesForLeague.indexOf(match),1)[0])
                }
            }
            duplicateTeams = []
        }
        console.log(tempMatchesForLeagueWithDates)
        return tempMatchesForLeagueWithDates
    }
    getTeamsByleague()
    
    premierLeagueDates = generateDates(premierLeagueTeams.length)
    championshipDates = generateDates(championshipTeams.length)
    matchesForPremierLeagueTeams = createMatchesForTeams(premierLeagueTeams, premierLeagueDates)
    matchesForChampionshipTeams = createMatchesForTeams(championshipTeams, championshipDates)

    console.log(matchesForChampionshipTeams)
    console.log(matchesForPremierLeagueTeams)
    return [matchesForChampionshipTeams,matchesForPremierLeagueTeams]

}
export default GameGenerator