import { useEffect, useRef, useState } from "react"


const Timer = ({time})=>{
    
    // const [timeForDisplayng, setTimeDisplayng] = useState(time)
    // let intervStorage = useRef ()
    // const [intervStorage, setIntervStorage] = useState()
    
    // const [decisionStatus, setDecisionStatus] = useState(decision)
    // const [finishGame, setFinishGame] = useState(isGameEnded)
    // const [pauseStatus, setPauseStatus] = useState()
    
   
    // const start = ()=>{
    //         setPauseStatus(false)
    //         run();
    //         // intervStorage = setInterval(run,500)
    //         setIntervStorage(setInterval(run,500))
        
    // }
    // const pause = ()=>{
    //     clearInterval(intervStorage)
    // }
    // const stop = ()=>{
    //     clearInterval(intervStorage)

    // }
    // var updateM = time.m, updateS = time.s;
    // const run = ()=>{
    //     if (!pauseStatus){
            
    //         if (updateS === 59){
    //             updateS = 0
    //             updateM++
    //         }
    //         updateS++
            
    //         if(updateM >= 90){
    //             endGame()
    //             // clearInterval(intervStorage)
    //             return stop()
    //         }else if(!finishGame){
    //             setGameTime({m:updateM, s:updateS})
    //             return setTime({m: updateM, s: updateS})
    //         }
    //     }

    // }

    // useEffect(()=>{
    //     if(decision){
            
    //         clearInterval(intervStorage)
    //         setPauseStatus(true)
    //         pause()
    //     }
    // },[decision])
    // useEffect(()=>{
    //     if(!startTimer && !pauseStatus){
    //         start()
    //     }
    // },[startTimer])



    return(
        // <div>
        // <h2>{time.m}:{time.s}</h2>
        // </div>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">

      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          {time.m<10?<p> 0{time.m}</p>:<p> {time.m}</p>}
      
        min
      </div> 
  {/* <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-2xl">
      <span style={{"--value": time.s}}></span>
    </span>
    sec
  </div> */}
</div>
    )


}

export default Timer



// const [time, setTime] = useState({m:0, s:0})
// // let intervStorage = useRef ()
// const [intervStorage, setIntervStorage] = useState()

// const [decisionStatus, setDecisionStatus] = useState(decision)
// const [finishGame, setFinishGame] = useState(isGameEnded)
// const [pauseStatus, setPauseStatus] = useState()


// const start = ()=>{
//         setPauseStatus(false)
//         run();
//         // intervStorage = setInterval(run,500)
//         setIntervStorage(setInterval(run,500))
    
// }
// const pause = ()=>{
//     clearInterval(intervStorage)
// }
// const stop = ()=>{
//     clearInterval(intervStorage)

// }
// var updateM = time.m, updateS = time.s;
// const run = ()=>{
//     if (!pauseStatus){
        
//         if (updateS === 59){
//             updateS = 0
//             updateM++
//         }
//         updateS++
        
//         if(updateM >= 90){
//             endGame()
//             // clearInterval(intervStorage)
//             return stop()
//         }else if(!finishGame){
//             setGameTime({m:updateM, s:updateS})
//             return setTime({m: updateM, s: updateS})
//         }
//     }

// }

// useEffect(()=>{
//     if(decision){
        
//         clearInterval(intervStorage)
//         setPauseStatus(true)
//         pause()
//     }
// },[decision])
// // useEffect(()=>{
// //     if(!startTimer && !pauseStatus){
// //         start()
// //     }
// // },[startTimer])



// return(
//     <div>
//     <h2>{time.m}:{time.s}</h2>
//     <button onClick={start}>Start</button>
//     <button onClick={pause}>Pause</button>
//     </div>
// )