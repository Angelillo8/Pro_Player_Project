import { useEffect, useState, useRef, useReducer } from "react"
import TeamReady from "./TeamReady";
import Game from "./Game";
import Timer from "./Timer";
import TeamDisplay from "./TeamDisplay";
import DisplayDecisions from "./DiaplayDecisions";
import Scoring from "../../logic/Scoring";
import Passing from "../../logic/Passing"
import ScoreBoard from "./ScoreBoard";
import GameEventDisplay from "./GameEventsDisplay"
import { useParams } from "react-router-dom";
import ProplayerService from "../../services/ProplayerService";
import Dribbling from "../../logic/Dribbling";

const scoreUpdate = (score, action)=>{
    switch (action.type){
        case 'HOME_TEAM_SCORES':
            return {...score, homeTeam: score.homeTeam + 1};
        case 'AWAY_TEAM_SCORES':
            return {...score, awayTeam: score.awayTeam + 1};
        default:
            return score;
    }
}

const scorersAssistsUpdate = (scorersAssists, action)=>{
    switch (action.type){
        case 'HOME_TEAM_SCORERS':
            return {...scorersAssists, homeTeamScorers: [...scorersAssists.homeTeamScorers, action.player]}
        case 'HOME_TEAM_ASSISTS':
            return {...scorersAssists, homeTeamAssists: [...scorersAssists.homeTeamAssists, action.player]}
        case 'AWAY_TEAM_SCORERS':
            return {...scorersAssists, awayTeamScorers: [...scorersAssists.awayTeamScorers, action.player]}
        case 'AWAY_TEAM-ASSISTS':
            return {...scorersAssists, awayTeamAssists: [...scorersAssists.awayTeamAssists, action.player]}
        default:
            return scorersAssists;
    }
}

const Match = ()=>{
    const id = useParams()
    const [matschLoaded, setMatchLoaded] = useState(false)
    let timeMemory = useRef({m:0, s:0})
    let ourPlayer = useRef({})
    let playerToPass = useRef()
    const [match,setMatch] = useState()
    const [time, setTime] = useState({m:0, s:0})
    const [teamHomePlayers, setTeamHomePlayers] = useState()
    const [teamAwayPlayers, setTeamAwayPlayers] = useState()
    const [score, dispatch] = useReducer(scoreUpdate,{homeTeam: 0, awayTeam: 0})
    const [scorersAssists, dispatchScorersAssists] = useReducer(scorersAssistsUpdate,{homeTeamScorers: [], homeTeamAssist: [], awayTeamScorers: [], awayTeamAssist: []})
    // const [teamHomeScore, setTeamHomeScore] = useState(0)
    // const [teamAwayScore, setTeamAwayScore] = useState(0)
    // const [teamHomeScorers, setTeamHomeScores] = useState([])
    // const [teamAwayScorers, setTeamAwayScores] = useState([])
    const [playerReward, setPlayerReward] = useState(0)
    const [decisionStatus, setDecisionStatus] = useState(false)
    const [isGameEnded, setGameEnded] = useState(false)
    const [gameEventHistory, setGameEventHistory] = useState([])
    const [btnState, setBtnState] = useState(1)
    let intervStorage = useRef()
    const [eventArray, setEventArray] = useState([])
    const eventHistoryKept = useRef(0)
    const timeout = useRef(0)
    const pauseGameStatus = useRef(false)

    
    
    
    
    const getUserPlayer = ()=>{
        let ourPlayerTemp = {}
        for (let player of match.teamHome.players){
            if (player.user_player){
                ourPlayerTemp.team = "TA"
                ourPlayerTemp.player = {...player}
                ourPlayer.current = {...ourPlayerTemp}
                return
            }
        }
        for (let player of match.teamAway.players){
            if (player.user_player){
                ourPlayerTemp.team = "TB"
                ourPlayerTemp.player = {...player}
                ourPlayer.current = {...ourPlayerTemp}
                return
            }
        }

    }
    const populateEventArray = ()=>{
        let populatedEventArray = ["DN", "DN", "DN","DN"]
        if((match.teamAway.ovr  - 5) <= match.teamHome.ovr && match.teamHome.ovr  <= (match.teamAway.ovr + 5) ){
            populatedEventArray = [...populatedEventArray, "TA", "TA", "TB", "TB", "O", "O"]
        }
        else if (match.teamHome.ovr > (match.teamAway.ovr  + 5)){
            populatedEventArray = [...populatedEventArray, "TA", "TA", "TA", "TB", "O", "O"]
        }
        else {
            populatedEventArray = [...populatedEventArray, "TA", "TB", "TB", "TB", "O", "O"]
        }
        return populatedEventArray
    }
    useEffect(()=>{
        console.log("game started !!!!!!!!!!!!!!!!!!", id.matchId)
        ProplayerService.getOneMatch(id.matchId)
            .then(match=>setMatch(match), console.log("that is what we receive from DB", match))
        // fetch(`http://localhost:8080/matches/${id.matchId}`)
        // .then(res => res.json())
        // .then(match=>setMatch(match))
        // setEventArray(populateEventArray()) 
        return () => {
            clearTimeout(timeout.current);
            clearInterval(intervStorage.current);
        };
        
    },[])
    
    console.log("those are the match info", match)
    useEffect(()=>{
        if( match){
            console.log("I am preparing the game!!!!!!!", match.teamHome.players)
            setTeamHomePlayers(TeamReady(match.teamHome.players))
            setTeamAwayPlayers(TeamReady(match.teamAway.players))
            setEventArray(populateEventArray()) 
            getUserPlayer()
        }

    },[match])
    if(!match && ! matschLoaded){
        return
    }
    
        


    const startTimer = ()=>{
        run();
        // intervStorage = setInterval(run,500)
        // setIntervStorage(setInterval(run,500))
        intervStorage.current = setInterval(run,15) // can we do this?
    }
    const pauseTimer = ()=>{
        clearInterval(intervStorage.current)
    }
    const stopTimer = ()=>{
        clearInterval(intervStorage.current)
        setTime({m:0, s:0})

    }
    const startGame = ()=>{
        console.log("start game event added",[...gameEventHistory,{dot: "Start Game"}] )
        setGameEventHistory((prevGameEventHistory) =>[...prevGameEventHistory,{dot: "Start Game"}])
        // btnState.current = 2
        setBtnState(2)
        if(eventArray){

        }
        startTimer()
        pauseGameStatus.current = false
        timeout.current = setTimeout(pickRandomEvent, 5000)
        return () => {
            clearTimeout(timeout.current)
        }
    }
    const restartGame = ()=>{
        // btnState.current = 2
        setBtnState(2)
        startTimer()
        pauseGameStatus.current = false
        timeout.current = setTimeout(pickRandomEvent, 5000)
        return () => {
            clearTimeout(timeout.current)
        }
    }
    const pauseGame = ()=>{
        pauseTimer()
        clearTimeout(timeout.current)
        // btnState.current = 3
        setBtnState(3)
        pauseGameStatus.current = true
        console.log(btnState)
    }
    const endGame = ()=>{
        pauseTimer()
        clearTimeout(timeout.current)
        pauseGameStatus.current = true
        setGameEnded(true)
        setBtnState(4)
    }



    // var updateM = time.m, updateS = time.s;
    const run = ()=>{
        console.log("current minute", timeMemory.current.m)
        console.log("useState minute", time.m)
        
        if (timeMemory.current.s === 59){
            timeMemory.current.s = 0
            timeMemory.current.m++
        }
        
        timeMemory.current.s++
        if(timeMemory.current.m > 90){
            console.log("game ending ",[...gameEventHistory,{dot: "Finished"}])
            setGameEventHistory((prevEventHistory) => [...prevEventHistory, {dot: "Finished"}])
            endGame()
            return 
        }else {
            return setTime({m: timeMemory.current.m, s: timeMemory.current.s})
        }
    }

    const pickDefenderToCompete = ()=>{
        if(ourPlayer.current.team === "TA"){
            return teamAwayPlayers.def[Math.floor(Math.random()*teamHomePlayers.def.length)]
        }
        return teamAwayPlayers.def[Math.floor(Math.random()*teamHomePlayers.def.length)]
    }
    const pickGKToCompete = () =>{
        if(ourPlayer.current.team === "TA"){
            return teamAwayPlayers.gk
        }
        return teamHomePlayers.gk
    }
    const pickPlayerToPass = (team)=>{
        const players = team.st.filter((player)=> !player.user_player)
        if(players.length === 1){
            return players[0]
        }
        let randomIndex = Math.floor( Math.random() * players.length)
        return players[randomIndex]
    }
    const pickPlayerForScoring = (team)=>{
        const playerProbabilityToPick = ["st", "def", "st", "def", "mid", "st", "mid", "mid", "st", "st"]
        const randomIndex = Math.floor(Math.random()*playerProbabilityToPick.length)
        const allNotUserPlayers = team[playerProbabilityToPick[randomIndex]].filter((player) => !player.user_player)
        const randomPlayerIndex = Math.floor(Math.random() * allNotUserPlayers.length)
        return allNotUserPlayers[randomPlayerIndex]
    }


    const pickRandomEvent = () =>{
        // do stuff
        // setTeamAwayScore(prevscore => prevscore + 1)
        const timer =(Math.floor(Math.random()*(10 - 3 + 1)) + 3) * 1500 // what does this timer do???
        console.log({timer}) 
        if(eventArray && !pauseGameStatus.current){
            const newEvent = {dot: timeMemory.current.m} // i think this line is causing problems.  
            const i = Math.floor(Math.random()*10)
            console.log("random event number",{i})
            if(eventArray[i] === "TA"){
                // setTeamHomeScore(prevscore=>prevscore+1)
                const player = pickPlayerForScoring(teamHomePlayers)
                newEvent["children"] = `${player.name} scores for ${match.teamHome.name}`
                newEvent["color"] = 'red'
                newEvent["position"] = 'right'
                console.log("red team scores game event gameEventHistory:", {gameEventHistory})
                console.log("red team scores game event newEvent:", {newEvent})
                console.log("I'm the state when red scores", [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                // setTeamHomeScore((prevTeamScore) => prevTeamScore+1)
                dispatch({type: 'HOME_TEAM_SCORES'})
                dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: player})
                // setTeamHomeScores((prevTeamScorers) => [...prevTeamScorers, player])
            }
            else if( eventArray[i] === "TB"){
                const player = pickPlayerForScoring(teamAwayPlayers)
                newEvent["children"] = `${player.name} scores for ${match.teamAway.name}`
                newEvent["color"] = 'blue'
                newEvent["position"] = 'left'
                console.log("blue team scores game event gameEventHistory:", {gameEventHistory})
                console.log("blue team scores game event newEvent:", {newEvent})

                console.log("I'm the state when blue scores" , [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                // setTeamAwayScore((prevTeamScore) => prevTeamScore+1)
                dispatch({type: 'AWAY_TEAM_SCORES'})
                dispatchScorersAssists({type: 'AWAY_TEAM_SCORERS', player: player})
                // setTeamAwayScores((prevTeamScorers) => [...prevTeamScorers, player])
            }
            else if( eventArray[i] === "O"){
                if(ourPlayer.current.team === "TA"){
                    playerToPass.current = pickPlayerToPass(teamHomePlayers)
                }
                else{
                    playerToPass.current = pickPlayerToPass(teamAwayPlayers)
                }
                console.log("It's an opportunity!!!!!!!!!")          
                pauseGame()
                clearTimeout(timeout.current)
                pauseGameStatus.current = true
                setDecisionStatus((prevState) => true)
            }
            timeout.current = setTimeout(pickRandomEvent,timer)
        }
        
       
        
    }



 

 
 

    const getDecisionEndPoint = (decision) =>{
        const newEvent = {dot: timeMemory.current.m}
        if (ourPlayer.current.team === "TA"){
            newEvent["color"] = 'red'
            newEvent["position"] = 'right'
            console.log("this is our player", ourPlayer)
            //Our player is in home team and he shoots~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            if(decision === "Shoot" || decision === "DShoot"){
                let results = Scoring(ourPlayer.current.player,pickDefenderToCompete(), pickGKToCompete());
                if(results){
                    newEvent["children"] = `${ourPlayer.current.player.name} Scored!!!!!!` 
                    // setTeamHomeScore(teamHomeScore +1)
                    dispatch({type: 'HOME_TEAM_SCORES'})
                    dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: ourPlayer.current.player})
                }else{
                    newEvent["children"] = `${ourPlayer.current.player.name} missed an opportunity`
                    // console.log("team b scored")
                    // setTeamAwayScore(teamAwayScore +1)
                    // newEvent["color"] = 'blue'
                    // newEvent["position"] = 'left'
                    
                }
                console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            // Dribbling and then pass~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            else if(decision === "DPass"){
                if(Dribbling(ourPlayer.current.player, pickDefenderToCompete())){
                    if(Passing(ourPlayer.current.player, pickDefenderToCompete())){
                        if(Scoring(playerToPass.current, pickDefenderToCompete(), pickGKToCompete())){
                            newEvent["children"] = `${playerToPass.current.name} Scored!!!!!!` 
                            // setTeamHomeScore(teamHomeScore +1)
                            dispatch({type: 'HOME_TEAM_SCORES'})
                            dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: playerToPass})
                            dispatchScorersAssists({type: 'HOME_TEAM_ASSISTS', player: ourPlayer.current.player})
                        }else{
                            newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                        }
                        console.log("either A or B team scored", [...gameEventHistory,newEvent])
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                        setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                        restartGame()
                        return
                    }
                    newEvent["children"] = `Ball never reached ${playerToPass.current.name}`
                    console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
                    setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                    restartGame()
                    return
                }
                newEvent["children"] = `Defender stopped you`
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            //Our player is in home team and he pass~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            let passingResults = Passing(ourPlayer.current.player, pickDefenderToCompete());
            if(passingResults){
                let scoringResults = Scoring(playerToPass.current, pickDefenderToCompete(), pickGKToCompete())
                if(scoringResults){
                    newEvent["children"] = `${playerToPass.current.name} Scored!!!!!!` 
                    // setTeamHomeScore(teamHomeScore +1)
                    dispatch({type: 'HOME_TEAM_SCORES'})
                    dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: playerToPass})
                    dispatchScorersAssists({type: 'HOME_TEAM_ASSISTS', player: ourPlayer.current.player})
                }else{
                    newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                    // console.log("team b scored")
                    // setTeamAwayScore(teamAwayScore +1)
                    // newEvent["color"] = 'blue'
                    // newEvent["position"] = 'left'
                    
                }
                console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            newEvent["children"] = `the defender stopped your pass to ${playerToPass.current.name}`
            console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
            setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
            setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
            restartGame()
            return
                    
        }else{
            //Our player is in the away team~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            newEvent["color"] = 'blue'
            newEvent["position"] = 'left'
            //Our player is in away team and he shoots~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            if(decision === "Shoot" || decision === "DShoot"){
                let results = Scoring(ourPlayer.current.player,pickDefenderToCompete(), pickGKToCompete());
                if(results){
                    newEvent["children"] = `${ourPlayer.current.player.name} Scored!!!!!!` 
                    // setTeamHomeScore(teamAwayScore +1)
                    dispatch({type: 'AWAY_TEAM_SCORES'})
                    dispatchScorersAssists({type: 'AWAY_TEAM_SCORERS', player: ourPlayer.current.player})
                }else{
                    newEvent["children"] = `${ourPlayer.current.player.name} missed an opportunity`   
                }
                console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            // Dribbling and then pass~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            else if(decision === "DPass"){
                if(Dribbling(ourPlayer.current.player, pickDefenderToCompete())){
                    if(Passing(ourPlayer.current.player, pickDefenderToCompete())){
                        if(Scoring(playerToPass.current, pickDefenderToCompete(), pickGKToCompete())){
                            newEvent["children"] = `${playerToPass.current.name} Scored!!!!!!` 
                            // setTeamHomeScore(teamAwayScore +1)
                            dispatch({type: 'AWAY_TEAM_SCORES'})
                            dispatchScorersAssists({type: 'AWAY_TEAM_SCORERS', player: playerToPass})
                            dispatchScorersAssists({type: 'AWAY_TEAM_ASSISTS', player: ourPlayer.current.player})
                        }else{
                            newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                        }
                        console.log("either A or B team scored", [...gameEventHistory,newEvent])
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                        setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                        restartGame()
                        return
                    }
                    newEvent["children"] = `Ball never reached ${playerToPass.current.name}`
                    console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
                    setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                    restartGame()
                    return
                }
                newEvent["children"] = `Defender stopped you`
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            //Our player is in the away team and he passes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            let passingResults = Passing(ourPlayer.current.player, pickDefenderToCompete());
            if(passingResults){
                let scoringResults = Scoring(playerToPass.current, pickDefenderToCompete(), pickGKToCompete())
                if(scoringResults){
                    newEvent["children"] = `${playerToPass.current.name} Scored!!!!!!` 
                    // setTeamHomeScore(teamAwayScore +1)
                    dispatch({type: 'AWAY_TEAM_SCORES'})
                    dispatchScorersAssists({type: 'AWAY_TEAM_SCORERS', player: playerToPass})
                    dispatchScorersAssists({type: 'AWAY_TEAM_ASSISTS', player: ourPlayer.current.player})
                }else{
                    newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                }
                console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }

            newEvent["children"] = `the defender stopped your pass to ${playerToPass.current.name}`
            console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])


            setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
            setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
            restartGame() 
            return
        }
                   
  
    }

    const finishGame = ()=>{



    }




    
    console.log("that is all events", gameEventHistory)
    return(
        <>
       {match && (
        <div className="flex flex-col items-center">
            <ScoreBoard homeTeam={match.teamHome} awayTeam={match.teamAway} score={score}/>
            <div className="flex items-start">
               {teamHomePlayers? <TeamDisplay team={teamHomePlayers} teamScorers={scorersAssists.homeTeamScorers}/> : null}
                <div className="flex flex-col items-center">
                    {isGameEnded ? <h2>Finished</h2> : <Timer time = {time} />}
                    <div className="overflow-auto overscroll-y-contain h-80 w-80 ">
                    <p>
                    <GameEventDisplay gameEvents={gameEventHistory}/>
                    </p>
                    </div>
                </div>
                {teamAwayPlayers? <TeamDisplay team={teamAwayPlayers} teamScorers={scorersAssists.awayTeamScorers}/> : null}
            </div>
            {decisionStatus && playerToPass? <DisplayDecisions getDecisionEndPoint = {getDecisionEndPoint} playerToPass = {playerToPass.current}/> : null}
            {btnState === 1?(
                <button className=" btn" onClick={startGame}>Start Game</button>
            ): btnState === 2?(
                <button className=" btn" onClick={pauseGame}>Pause Game</button>
            ): btnState === 3?(
                <button className=" btn" onClick={restartGame}> Resume Game</button>
            ) : <button className=" btn" onClick={finishGame}>Finished Game</button>}
        </div> )}
        </>
    )
}

export default Match



// const newEvent = {dot: timeMemory.current.m}
//         if (decision === "Shoot"){
//             let results = Scoring(ourPlayer.current.player,pickDefenderToCompete(), pickGKToCompete());
//             console.log("this is our player", ourPlayer)
//             if(results){
//                 newEvent["children"] = `${ourPlayer.current.player.name} Scored!!!!!!` 
//                 if(ourPlayer.current.team === "TA"){
//                     console.log("team a scored")

//                     setTeamHomeScore(teamHomeScore +1)
//                     newEvent["color"] = 'red'
//                     newEvent["position"] = 'right'
//                 }else{
//                     console.log("team b scored")
//                     setTeamAwayScore(teamAwayScore +1)
//                     newEvent["color"] = 'blue'
//                     newEvent["position"] = 'left'
                    
//                 }
//                 console.log("either A or B team scored", [...gameEventHistory,newEvent])
//                 setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//                 setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//                 restartGame()
//                 return
//             }
//             if(ourPlayer.current.team === "TA"){
//                 newEvent["color"] = 'red'
//                 newEvent["position"] = 'right'
//             }else{
//                 newEvent["color"] = 'blue'
//                 newEvent["position"] = 'left'
//             }
//             newEvent["children"] = `${ourPlayer.current.player.name} missed an opportunity`
//             console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])


//             setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//             setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//             restartGame()
//             return
                    
//         }else{ // descison is not shoot but pass 
//             let results = Passing(ourPlayer.current.player,pickDefenderToCompit(),);
//             if(results){
//                 if(ourPlayer.current.team === "TA"){
//                     if(Scoring(teamHomePlayers.st[0], teamAwayPlayers.def[0], teamAwayPlayers.gk)){
                        
//                         newEvent["children"] = `${teamHomePlayers.st[0].name} Scored. Thanks to your assist` 
//                         newEvent["color"] = 'red'
//                         newEvent["position"] = 'right'
//                         console.log("Team A passed and did score", [...gameEventHistory,newEvent])

//                         setTeamHomeScore(prevTeamAScore => prevTeamAScore + 1)
//                         setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//                         setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//                         restartGame()
//                         return
//                     }else {
                        
//                         newEvent["children"] = `${teamHomePlayers.st[0].name} missed the goal` 
//                         newEvent["color"] = 'red'
//                         newEvent["position"] = 'right'
//                         console.log("Team A passed and didn't score", [...gameEventHistory,newEvent])

//                         setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//                         setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//                         restartGame()
//                         return
//                     }
//                 }
//                 else{
//                     if(Scoring(teamAwayPlayers.st[0], teamHomePlayers.def[0], teamHomePlayers.gk)){
//                         newEvent["children"] = `${teamAwayPlayers.st[0].name} Scored. Thanks to your assist` 
//                         newEvent["color"] = 'blue'
//                         newEvent["position"] = 'left'
//                         console.log("b team passed and scored", [...gameEventHistory,newEvent])
//                         setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//                         setTeamAwayScore((prevTeamBScore) => prevTeamBScore + 1)
//                         setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//                         restartGame()
//                         return
//                     }else {
//                         newEvent["color"] = 'blue'
//                         newEvent["position"] = 'left'
//                         newEvent["children"] = `${teamAwayPlayers.st[0].name} missed the goal` 
//                         console.log("B team passed and did not score", [...gameEventHistory,newEvent])
//                         setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
//                         setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//                         restartGame()
//                         return

//                     }
//                 }
//             }
//             if(ourPlayer.current.team === "TA"){
//                 newEvent["color"] = 'red'
//                 newEvent["position"] = 'right'
//             }else{
//                 newEvent["color"] = 'blue'
//                 newEvent["position"] = 'left'
//             }
//             newEvent["children"] = `the defender stopped you` 
//             console.log("new event defender stopped you", [...gameEventHistory,newEvent])
//             setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])

//         }
//         setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
//         restartGame()
    

// const player1 = { name: "John", position: "gk", ovr: 70 ,positioning: 60, diving: 70, reflexes:50};
//     const player2 = { name: "John", position: "gk", ovr: 65};
//     const player3 = { name: "John", position: "df", ovr: 77, slideTackle: 50, standTackle: 80};
//     const player4 = { name: "John", position: "df", ovr: 67};
//     const player5 = { name: "John", position: "df", ovr: 73};
//     const player6 = { name: "John", position: "mid", ovr: 80};
//     const player7 = { name: "John", position: "mid", ovr: 70};
//     const player8 = { name: "John", position: "st", ovr: 78, shotPower:60, finishing: 60, attPosition: 67};
//     console.log(Scoring(player8,player3, player1))
//     const teamA = {name: "OSFP", players: [player1, player2, player3, player4, player5, player6, player7, player8]} 
//     const teamB = {name: "PAO", players: [player1, player2, player3, player4, player5, player6, player7, player8]} 
//     const [time, setTime] = useState({m:0, s:0})
//     const [teamHomePlayers, setTeamHomePlayers] = useState(TeamReady(teamA.players))
//     const [teamAwayPlayers, setTeamAwayPlayers] = useState(TeamReady(teamB.players))
//     const [teamHomeScore, setTeamHomeScore] = useState(0)
//     const [teamAwayScore, setTeamAwayScore] = useState(0)
//     const [playerReward, setPlayerReward] = useState(0)
//     const [decisionStatus, setDecisionStatus] = useState(false)
//     const [gameStatus, setGameStatus] = useState(true)
//     const [startTimer,setStartTimer] = useState(true)
//     const [isGameEnded, setGameEnded] = useState(false)
//     const [gameEventHistory, setGameEventHistory] = useState()
//     console.log(time.m)

//     const getScore= (team) =>{
//         if(team === "A"){
//             setTeamHomeScore(teamAScore+1)
//         }else{
//             setTeamBScore(teamBScore+1)
//         }
//     }

//     const getDecisionEndPoint = (decision) =>{
//         if (decision === "Shoot"){
//             let results = Scoring(player8,player3, player1);
//             console.log(decision)
//             if(results){
//                 // const newEvent = gameEventHistory
//                 const eventTime = time.m
//                 const newEvent = `${player1.name} Scored!!!!!!` 
//                 setGameEventHistory(newEvent)
//                 if(teamA.players.includes(player1)){
//                     setTeamAScore(teamAScore +1)
//                 }else{
//                     setTeamBScore(teamBScore +1)
//                 }
//             }
//             // const newEvent = gameEventHistory
//             const eventTime = time.m
//             const newEvent = `${player1.name} missed an opportunity` 
//             setGameEventHistory(newEvent)
            
//         }
//         setDecisionStatus(!decisionStatus)
//         setGameStatus(true)
//         setStartTimer(true)
//     }

//     const setGameTime = (time)=>{
//         setTime(time)
//     }
//     const endGame = ()=>{
//         setGameEnded(true)
//     }
    
//     const getOpportunity = ()=>{
//         setDecisionStatus(!decisionStatus)
//         console.log("change")
//         setGameStatus(false)
//         // if(gameStatus === true){
//         //     setGameStatus(!gameStatus)
//         // }else{
//         //     setGameStatus(true)
//         // }
//         setStartTimer(false)
//     }


//     return(
//         <div>
//             {/* <h2>keys {Object.keys(gameEventHistory)}   and values {Object.values(gameEventHistory)}</h2> */}
//             <h2>{gameEventHistory}</h2>
//             <ScoreBoard homeTeam={teamA} awayTeam={teamB} homeTeamScore={teamAScore} awayTeamScore={teamBScore}/>
//             <TeamDisplay team={teamA}/>
//             <TeamDisplay team={teamB}/>
//             {gameStatus? <Game getOpportunity = {getOpportunity} getScore = {getScore}/>:null}
//             {isGameEnded ? <h2>Finished</h2> : <Timer startTimer = {startTimer} setGameTime = {setGameTime} decision={decisionStatus} isGameEnded={isGameEnded} endGame = {endGame}/>}
//             {decisionStatus? <DisplayDecisions getDecisionEndPoint = {getDecisionEndPoint}/> : null}
//             <button onClick={getOpportunity}>aaaaaa</button>
//         </div>
//     )