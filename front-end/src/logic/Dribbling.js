
const Dribbling = (player, defender)=>{

    let dribblingProbability = 0;
    let missingProbability = 0;
    let dribbling =""
    let dribblingProbabilityTable = []
    const defenderAVG = (defender.slide_tackle + defender.stand_tackle)/2;
    const playerAVG =  (player.dribbling + player.at_positioning + player.ball_control)/ 3;

    if((defenderAVG-7)<=playerAVG && (defenderAVG+7)>=playerAVG){
        dribblingProbability = 5;
        missingProbability = 10-5;
        for (let i=0; i< dribblingProbability; i++){
            dribblingProbabilityTable.push("D")
        }
        for (let i=0; i< missingProbability; i++){
            dribblingProbabilityTable.push("ND")
        }

        
    }
    else if( (defenderAVG-7) >= playerAVG ){
        missingProbability = getRandomInt(6,8);
        dribblingProbability = 10- missingProbability;
        for (let i=0; i< dribblingProbability; i++){
            dribblingProbabilityTable.push("D")
        }
        for (let i=0; i< missingProbability; i++){
            dribblingProbabilityTable.push("ND")
        }

    }
    else{
        dribblingProbability = getRandomInt(6,8);
        missingProbability = 10- missingProbability;
        for (let i=0; i< dribblingProbability; i++){
            dribblingProbabilityTable.push("D")
        }
        for (let i=0; i< missingProbability; i++){
            dribblingProbabilityTable.push("ND")
        }

    }

    dribbling = dribblingProbabilityTable[getRandomInt(0,10)]
    if (dribbling === "D"){
        console.log("Dribbled")
        return true
    }else{
        console.log("Missed faking idiot")
        return false
        // should probs be a bool return
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



}
export default Dribbling
