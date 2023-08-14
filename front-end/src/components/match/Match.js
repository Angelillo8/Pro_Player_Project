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
import { useNavigate, useParams } from "react-router-dom";
import ProplayerService from "../../services/ProplayerService";
import Dribbling from "../../logic/Dribbling";

const scoreUpdate = (score, action)=>{
    switch (action.type){
        case 'HOME_TEAM_SCORES':
            return {...score, homeTeam: score.homeTeam + 1};
        case 'AWAY_TEAM_SCORES':
            return {...score, awayTeam: score.awayTeam + 1};
        case 'SET_SCORE_TABLE':
            return {...action.ScoreBoard}
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
        case 'SET_ALL_SCORERS':
            return {...action.allScorers}
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
    let isItRefreshed = useRef(true)
    const [match,setMatch] = useState()
    const [time, setTime] = useState({m:0, s:0})
    const [teamHomePlayers, setTeamHomePlayers] = useState()
    const [teamAwayPlayers, setTeamAwayPlayers] = useState()
    const [score, dispatch] = useReducer(scoreUpdate,{homeTeam: 0, awayTeam: 0})
    const [scorersAssists, dispatchScorersAssists] = useReducer(scorersAssistsUpdate,{homeTeamScorers: [], homeTeamAssists: [], awayTeamScorers: [], awayTeamAssists: []})
    // const [teamHomeScore, setTeamHomeScore] = useState(0)
    // const [teamAwayScore, setTeamAwayScore] = useState(0)
    // const [teamHomeScorers, setTeamHomeScores] = useState([])
    // const [teamAwayScorers, setTeamAwayScores] = useState([])
    const playerReward = useRef(0)

    const [decisionStatus, setDecisionStatus] = useState(false)
    const [isGameEnded, setGameEnded] = useState(false)
    const [gameEventHistory, setGameEventHistory] = useState([])
    const [btnState, setBtnState] = useState(1)
    let intervStorage = useRef()
    const [eventArray, setEventArray] = useState([])
    const eventHistoryKept = useRef(0)
    const timeout = useRef(0)
    const pauseGameStatus = useRef(false)
    const navigate = useNavigate()

    
    
    
    
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
        if(JSON.parse(localStorage.getItem("time")) != null) {
            setTime(JSON.parse(localStorage.getItem("time")))
            timeMemory.current = JSON.parse(localStorage.getItem("time"))
            setGameEventHistory([...JSON.parse(localStorage.getItem("gameEvents"))])
            dispatch({type: 'SET_SCORE_TABLE', ScoreBoard: JSON.parse(localStorage.getItem("score"))})
            dispatchScorersAssists({type: 'SET_ALL_SCORERS', allScorers: JSON.parse(localStorage.getItem("allScorers"))})
            playerReward.current = JSON.parse(localStorage.getItem("reward")).current
            if (timeMemory.current.m>= 90){
                setBtnState(4)
            }else{
                setBtnState(3)
            }
        }
        return () => {
            clearTimeout(timeout.current);
            clearInterval(intervStorage.current);
        };
        
    },[])
    
    // console.log("those are the match info", match)
    useEffect(()=>{
        if( match){
            // console.log("I am preparing the game!!!!!!!", match.teamHome.players)
            setTeamHomePlayers(TeamReady(match.teamHome.players))
            setTeamAwayPlayers(TeamReady(match.teamAway.players))
            setEventArray(populateEventArray()) 
            getUserPlayer()
        }

    },[match])

    useEffect(()=>{
        if (!isItRefreshed.current){
            localStorage.setItem("score", JSON.stringify(score))
            localStorage.setItem("gameEvents", JSON.stringify(gameEventHistory))
            localStorage.setItem("allScorers", JSON.stringify(scorersAssists))
            localStorage.setItem("reward", JSON.stringify(playerReward))
        }
        isItRefreshed.current = false
    },[score, gameEventHistory, scorersAssists, playerReward.current])
    if(!match && !matschLoaded){
        return
    }
    
        


    const startTimer = ()=>{
        run();
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
        // console.log("start game event added",[...gameEventHistory,{dot: "Start Game"}] )
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
        // console.log("current minute", timeMemory.current.m)
        // console.log("useState minute", time.m)
        
        if (timeMemory.current.s === 59){
            timeMemory.current.s = 0
            timeMemory.current.m++
        }
        
        timeMemory.current.s++
        if(timeMemory.current.m > 90){
            // console.log("game ending ",[...gameEventHistory,{dot: "Finished"}])
            setGameEventHistory((prevEventHistory) => [...prevEventHistory, {dot: "Finished"}])
            localStorage.setItem("time", JSON.stringify({m: timeMemory.current.m, s: timeMemory.current.s}))
            endGame()
            return 
        }else {
            localStorage.setItem("time", JSON.stringify({m: timeMemory.current.m, s: timeMemory.current.s}))
            // localStorage.setItem("score", JSON.stringify(score))
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
        console.log("this is the timer that we have to wait", {timer}) 
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
                // console.log("red team scores game event gameEventHistory:", {gameEventHistory})
                // console.log("red team scores game event newEvent:", {newEvent})
                // console.log("I'm the state when red scores", [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                // setTeamHomeScore((prevTeamScore) => prevTeamScore+1)
                dispatch({type: 'HOME_TEAM_SCORES'})
                dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: player})
                // localStorage.setItem("score", JSON.stringify(score))
                // setTeamHomeScores((prevTeamScorers) => [...prevTeamScorers, player])
            }
            else if( eventArray[i] === "TB"){
                const player = pickPlayerForScoring(teamAwayPlayers)
                newEvent["children"] = `${player.name} scores for ${match.teamAway.name}`
                newEvent["color"] = 'blue'
                newEvent["position"] = 'left'
                // console.log("blue team scores game event gameEventHistory:", {gameEventHistory})
                // console.log("blue team scores game event newEvent:", {newEvent})

                // console.log("I'm the state when blue scores" , [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                // setTeamAwayScore((prevTeamScore) => prevTeamScore+1)
                dispatch({type: 'AWAY_TEAM_SCORES'})
                dispatchScorersAssists({type: 'AWAY_TEAM_SCORERS', player: player})
                // localStorage.setItem("score", JSON.stringify(score))
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
                // pauseGame()
                pauseTimer()
                clearTimeout(timeout.current)
                pauseGameStatus.current = true
                setDecisionStatus((prevState) => true)
                return
            }
            // localStorage.setItem("score", JSON.stringify(score))
            timeout.current = setTimeout(pickRandomEvent,timer)
        }
        
       
        
    }



 

 
 

    const getDecisionEndPoint = (decision) =>{
        const newEvent = {dot: timeMemory.current.m}
        if (ourPlayer.current.team === "TA"){
            newEvent["color"] = 'red'
            newEvent["position"] = 'right'
            // console.log("this is our player", ourPlayer)
            //Our player is in home team and he shoots~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            if(decision === "Shoot" || decision === "DShoot"){
                let results = Scoring(ourPlayer.current.player,pickDefenderToCompete(), pickGKToCompete());
                if(results){
                    newEvent["children"] = `${ourPlayer.current.player.name} Scored!!!!!!` 
                    // setTeamHomeScore(teamHomeScore +1)
                    dispatch({type: 'HOME_TEAM_SCORES'})
                    dispatchScorersAssists({type: 'HOME_TEAM_SCORERS', player: ourPlayer.current.player})
                    playerReward.current = playerReward.current + 400
                    // localStorage.setItem("score", JSON.stringify(score))
                }
                newEvent["children"] = `${ourPlayer.current.player.name} missed an opportunity`
                // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                playerReward.current = playerReward + 100
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
                            playerReward.current = playerReward + 300
                            // localStorage.setItem("score", JSON.stringify(score))
                        }
                        newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                        // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                        playerReward.current = playerReward + 200
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                        setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                        restartGame()
                        return
                    }
                    newEvent["children"] = `Ball never reached ${playerToPass.current.name}`
                    // console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
                    playerReward.current = playerReward.current + 100
                    setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                    restartGame()
                    return
                }
                playerReward.current = playerReward.current + 100
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
                    playerReward.current = playerReward + 200
                    // localStorage.setItem("score", JSON.stringify(score))
                }
                newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                playerReward.current = playerReward.current + 100
                // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }
            newEvent["children"] = `the defender stopped your pass to ${playerToPass.current.name}`
            // console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
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
                    playerReward.current = playerReward.current + 500
                    // localStorage.setItem("score", JSON.stringify(score))
                }
                newEvent["children"] = `${ourPlayer.current.player.name} missed an opportunity`   
                // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                playerReward.current = playerReward.current + 200
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
                            playerReward.current = playerReward.current + 400
                            // localStorage.setItem("score", JSON.stringify(score))
                        }
                        newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                        // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                        playerReward.current = playerReward.current + 300
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                        setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                        restartGame()
                        return
                    }
                    playerReward.current = playerReward.current + 200
                    newEvent["children"] = `Ball never reached ${playerToPass.current.name}`
                    // console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])
                    setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                    restartGame()
                    return
                }
                playerReward.current = playerReward.current + 200
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
                    playerReward.current = playerReward.current + 400
                    // localStorage.setItem("score", JSON.stringify(score))
                }
                newEvent["children"] = `${playerToPass.current.name} missed an opportunity`
                playerReward.current = playerReward.current + 200
                // console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
                return
            }

            newEvent["children"] = `the defender stopped your pass to ${playerToPass.current.name}`
            // console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])

            playerReward.current = playerReward.current + 200
            setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
            setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
            restartGame() 
            return
        }
                   
  
    }

    const finishGame = ()=>{
        let ourPlayerScores = [];
        let ourPlayerAssists = [];
        const updateMatch = {...match}
        const updateTeamHomePlayers = [teamHomePlayers.gk, ...teamHomePlayers.def, ...teamHomePlayers.mid, ...teamHomePlayers.st]
        const updateTeamAwayPlayers = [teamAwayPlayers.gk, ...teamAwayPlayers.def, ...teamAwayPlayers.mid, ...teamAwayPlayers.st]
        if (ourPlayer.current.team === "TA"){
            ourPlayerScores = scorersAssists.homeTeamScorers.filter((player) => player.id === ourPlayer.current.player.id)
            ourPlayerAssists = scorersAssists.homeTeamAssists.filter((player) => player.id === ourPlayer.current.player.id)
        }else{
            ourPlayerScores = scorersAssists.awayTeamScorers.filter((player) => player.id === ourPlayer.current.player.id)
            ourPlayerAssists = scorersAssists.awayTeamAssists.filter((player) => player.id === ourPlayer.current.player.id)
        }
        ourPlayer.current.player.appearances ++
        ourPlayer.current.player.assistance += ourPlayerAssists.length
        ourPlayer.current.player.goals += ourPlayerScores.length

        updateMatch.teamHomeGoals = score.homeTeam
        updateMatch.teamAwayGoals = score.awayTeam
        updateMatch.finished = true

        updateTeamHomePlayers.forEach((player)=>{
            if (!player.user_player){
                player.appearances++
                const countPlayerGoals = scorersAssists.homeTeamScorers.filter((footballPlayer)=> footballPlayer.id === player.id)
                const countPlayerAssists = scorersAssists.homeTeamAssists.filter((footballPlayer)=> footballPlayer.id === player.id)
                player.goals += countPlayerGoals.length
                player.assistance += countPlayerAssists.length
                ProplayerService.updatePlayer(player)
            }
        })
        updateTeamAwayPlayers.forEach((player)=>{
            if (!player.user_player){
                player.appearances++
                const countPlayerGoals = scorersAssists.awayTeamScorers.filter((footballPlayer)=> footballPlayer.id === player.id)
                const countPlayerAssists = scorersAssists.awayTeamAssists.filter((footballPlayer)=> footballPlayer.id === player.id)
                player.goals += countPlayerGoals.length
                player.assistance += countPlayerAssists.length
                ProplayerService.updatePlayer(player)
            }
        })
        ProplayerService.updateMatch(updateMatch)
        localStorage.clear()
        ProplayerService.updatePlayer(ourPlayer.current.player)
            .then (player => localStorage.setItem("ourPlayer", JSON.stringify(player)))

        navigate(`/home/${JSON.parse(localStorage.getItem("ourPlayer")).id}`)
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


