
const Passing = (player, defender)=>{

    let passingProbability = 0;
    let missingProbability = 0;
    let passing =""
    let passingProbabilityTable = []
    const defenderAVG = (defender.slide_tackle + defender.stand_tackle)/2;
    const playerAVG =  (player.short_pass + player.crossing + player.at_positioning + player.vision )/ 3;

    if((defenderAVG-7)<=playerAVG && (defenderAVG+7)>=playerAVG){
        passingProbability = 6;
        missingProbability = 10-6;
        for (let i=0; i< passingProbability; i++){
            passingProbabilityTable.push("P")
        }
        for (let i=0; i< missingProbability; i++){
            passingProbabilityTable.push("NP")
        }

        
    }
    else if( (defenderAVG-7) >= playerAVG ){
        missingProbability = getRandomInt(6,8);
        passingProbability = 10- missingProbability;
        for (let i=0; i< passingProbability; i++){
            passingProbabilityTable.push("P")
        }
        for (let i=0; i< missingProbability; i++){
            passingProbabilityTable.push("NP")
        }

    }
    else{
        passingProbability = getRandomInt(6,8);
        missingProbability = 10- missingProbability;
        for (let i=0; i< passingProbability; i++){
            passingProbabilityTable.push("P")
        }
        for (let i=0; i< missingProbability; i++){
            passingProbabilityTable.push("NP")
        }

    }

    passing = passingProbabilityTable[getRandomInt(0,10)]
    if (passing === "P"){
        console.log("Pass")
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
export default Passing
