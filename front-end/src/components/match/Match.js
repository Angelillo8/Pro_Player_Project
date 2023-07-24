import { useEffect, useState, useRef } from "react"
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

const Match = ()=>{
    let id = useParams()
    const [match,setMatch] = useState()
    const [time, setTime] = useState({m:0, s:0})
    const [teamHomePlayers, setTeamHomePlayers] = useState()
    const [teamAwayPlayers, setTeamAwayPlayers] = useState()
    const [teamHomeScore, setTeamHomeScore] = useState(0)
    const [teamAwayScore, setTeamAwayScore] = useState(0)
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

    
    const getUserPlayer = ()=>{

    }


    useEffect(()=>{
        console.log("game started !!!!!!!!!!!!!!!!!!")
        ProplayerService.getOneMatch(id)
            .then(match=>setMatch(match), setTeamAwayPlayers(TeamReady(match.teamAway.players)), setTeamHomePlayers(TeamReady(match.teamHome.players)),
            console.log("that is what we receive from DB", match))
        setEventArray(populateEventArray()) 
        return () => {
            clearTimeout(timeout.current);
            clearInterval(intervStorage.current);
          };

    },[])

    console.log("those are the match info", match)
    if(!match){
        return
    }
    const startTimer = ()=>{
        run();
        // intervStorage = setInterval(run,500)
        // setIntervStorage(setInterval(run,500))
        intervStorage.current = setInterval(run,30) // can we do this?
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
        timeout.current = setTimeout(pickRandomEvent, 1000)
        return () => {
            clearTimeout(timeout.current)
        }
    }

    const restartGame = ()=>{
        // btnState.current = 2
        setBtnState(2)
        startTimer()
        pauseGameStatus.current = false
        timeout.current = setTimeout(pickRandomEvent, 1000)
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
    var updateM = time.m, updateS = time.s;
    const run = ()=>{
            
            if (updateS === 59){
                updateS = 0
                updateM++
            }
            updateS++
            
            if(updateM >= 90){
                console.log("game ending ",[...gameEventHistory,{dot: "Finished"}])
                setGameEventHistory([...gameEventHistory,{dot: "Finished"}])
                endGame()
                return 
            }else if(!isGameEnded){
                return setTime({m: updateM, s: updateS})
            }
    }

    const pickDefenderToCompit = ()=>{
        if(match.teamHome.players.includes(ourPlayer)){
            return teamAwayPlayers.def[Math.floor(Math.random()*teamHomePlayers.def.length)]
        }
        return teamAwayPlayers.def[Math.floor(Math.random()*teamHomePlayers.def.length)]
    }
    const pickGKToCompit = () =>{
        if(match.teamHome.players.includes(ourPlayer)){
            return teamAwayPlayers.gk
        }
        return teamHomePlayers.gk
    }


    const pickRandomEvent = () =>{
        // do stuff
        // setTeamAwayScore(prevscore => prevscore + 1)
        const timer =(Math.floor(Math.random()*(10 - 3 + 1)) + 3) * 1500 // what does this timer do???
        console.log({timer}) 
        if(eventArray && !pauseGameStatus.current){
            const newEvent = {dot: time.m} // i think this line is causing problems.  
            const i = Math.floor(Math.random()*10)
            console.log("random event number",{i})
            if(eventArray[i] === "TA"){
                // setTeamHomeScore(prevscore=>prevscore+1)
                newEvent["children"] = `${match.teamHome.name} GOAL !!!!!!`
                newEvent["color"] = 'red'
                newEvent["position"] = 'right'
                console.log("red team scores game event gameEventHistory:", {gameEventHistory})
                console.log("red team scores game event newEvent:", {newEvent})
                console.log("I'm the state when red scores", [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                setTeamHomeScore((prevTeamScore) => prevTeamScore+1)
            }
            else if( eventArray[i] === "TB"){
                newEvent["children"] = `${match.teamAway.name} GOAL !!!!!!`
                newEvent["color"] = 'blue'
                newEvent["position"] = 'left'
                console.log("blue team scores game event gameEventHistory:", {gameEventHistory})
                console.log("blue team scores game event newEvent:", {newEvent})

                console.log("I'm the state when blue scores" , [...gameEventHistory, newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory, newEvent])
                setTeamAwayScore((prevTeamScore) => prevTeamScore+1)
            }
            else if( eventArray[i] === "O"){
                console.log("It's an opportunity!!!!!!!!!")          
                pauseGame()
                clearTimeout(timeout.current)
                pauseGameStatus.current = true
                setDecisionStatus((prevState) => true)
            }else{

                console.log("Nothing")
            }
            console.log("game logic!!!!!!!!!")
            console.log({timer})
            timeout.current = setTimeout(pickRandomEvent,timer)
        }
        
       
        
    }



 

 
 

    const getDecisionEndPoint = (decision) =>{
        const newEvent = {dot:time.m}
        if (decision === "Shoot"){
            let results = Scoring(ourPlayer,pickDefenderToCompit(), pickGKToCompit());
            if(results){
                    newEvent["children"] = `${ourPlayer.name} Scored!!!!!!` 
                if(match.teamHome.players.includes(ourPlayer)){
                    console.log("team a scored")

                    setTeamHomeScore(teamHomeScore +1)
                    newEvent["color"] = 'red'
                    newEvent["position"] = 'right'
                }else{
                    console.log("team b scored")
                    setTeamAwayScore(teamAwayScore +1)
                    newEvent["color"] = 'blue'
                    newEvent["position"] = 'left'
                    
                }
                console.log("either A or B team scored", [...gameEventHistory,newEvent])
                setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])

            }
            if(match.teamHome.players.includes(ourPlayer)){
                newEvent["color"] = 'red'
                newEvent["position"] = 'right'
            }else{
                newEvent["color"] = 'blue'
                newEvent["position"] = 'left'
            }
            newEvent["children"] = `${ourPlayer.name} missed an opportunity`
            console.log("either A or B team missed a shot", [...gameEventHistory,newEvent])


            setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
            
                    
        }else{ // descison is not shoot but pass 
            let results = Passing(ourPlayer,pickDefenderToCompit());
            if(results){
                if(match.teamHome.players.includes(ourPlayer)){
                    if(Scoring(teamHomePlayers.st[0], teamAwayPlayers.def[0], teamAwayPlayers.gk)){
                        
                        newEvent["children"] = `${teamHomePlayers.st[0].name} Scored. Thanks to your assist` 
                        newEvent["color"] = 'red'
                        newEvent["position"] = 'right'
                        console.log("Team A passed and did score", [...gameEventHistory,newEvent])

                        setTeamHomeScore(prevTeamAScore => prevTeamAScore + 1)
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    }else {
                        
                        newEvent["children"] = `${teamHomePlayers.st[0].name} missed the goal` 
                        newEvent["color"] = 'red'
                        newEvent["position"] = 'right'
                        console.log("Team A passed and didn't score", [...gameEventHistory,newEvent])

                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                    }
                }
                else{
                    if(Scoring(teamAwayPlayers.st[0], teamHomePlayers.def[0], teamHomePlayers.gk)){
                        newEvent["children"] = `${teamAwayPlayers.st[0].name} Scored. Thanks to your assist` 
                        newEvent["color"] = 'blue'
                        newEvent["position"] = 'left'
                        console.log("b team passed and scored", [...gameEventHistory,newEvent])
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])
                        setTeamAwayScore((prevTeamBScore) => prevTeamBScore + 1)
                    }else {
                        newEvent["color"] = 'blue'
                        newEvent["position"] = 'left'
                        newEvent["children"] = `${teamAwayPlayers.st[0].name} missed the goal` 
                        console.log("B team passed and did not score", [...gameEventHistory,newEvent])
                        setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])

                    }
                }
            }
            if(match.teamHome.players.includes(ourPlayer)){
                newEvent["color"] = 'red'
                newEvent["position"] = 'right'
            }else{
                newEvent["color"] = 'blue'
                newEvent["position"] = 'left'
            }
            newEvent["children"] = `the defender stopped you` 
            console.log("new event defender stopped you", [...gameEventHistory,newEvent])
            setGameEventHistory((prevEventHistory) => [...prevEventHistory,newEvent])

        }
                setDecisionStatus((prevDecisionStatus)=> !prevDecisionStatus)
                restartGame()
    }

    const finishGame = ()=>{



    }




    
    console.log("that is all events", gameEventHistory)
    return(
       
        <div className="flex flex-col items-center">
            <ScoreBoard homeTeam={match.teamHome} awayTeam={match.teamAway} homeTeamScore={teamHomeScore} awayTeamScore={teamAwayScore}/>
            <div className="flex items-start">
                <TeamDisplay team={match.teamHome}/>
                {isGameEnded ? <h2>Finished</h2> : <Timer time = {time} />}
                <GameEventDisplay gameEvents={gameEventHistory}/>
                <TeamDisplay team={match.teamHome}/>
            </div>
            {decisionStatus? <DisplayDecisions getDecisionEndPoint = {getDecisionEndPoint}/> : null}
            {btnState === 1?(
                <button className=" btn" onClick={startGame}>Start Game</button>
            ): btnState === 2?(
                <button className=" btn" onClick={pauseGame}>Pause Game</button>
            ): btnState === 3?(
                <button className=" btn" onClick={restartGame}> Resume Game</button>
            ) : <button className=" btn" onClick={finishGame}>Finished Game</button>}
        </div>
    )
}

export default Match


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