
const Scoring = (player, defender, gk)=>{

    
        let scoringProbability = 0;
        let missingProbability = 0;
        let scoring = ""
        let scoringProbabilityTable = []
        let gkAVG = (gk.positioning + gk.diving + gk.reflexes)/3;
        let defenderAVG = (defender.slide_tackle + defender.stand_tackle)/2;
        let playerAVG =  (player.shot_power + player.finishing + player.at_positioning )/ 3;
        let opponentsAVG = (gkAVG + defenderAVG)/2;

        if((opponentsAVG-7)<=playerAVG && (opponentsAVG+7)>=playerAVG){
            scoringProbability = 5;
            missingProbability = 10-5;
            for (let i=0; i< scoringProbability; i++){
                scoringProbabilityTable.push("S")
            }
            for (let i=0; i< missingProbability; i++){
                scoringProbabilityTable.push("M")
            }

            
        }
        else if( (opponentsAVG-7) >= playerAVG ){
            missingProbability = getRandomInt(6,8);
            scoringProbability = 10- missingProbability;
            for (let i=0; i< scoringProbability; i++){
                scoringProbabilityTable.push("S")
            }
            for (let i=0; i< missingProbability; i++){
                scoringProbabilityTable.push("M")
            }

        }
        else{
            scoringProbability = getRandomInt(6,8);
            missingProbability = 10- missingProbability;
            for (let i=0; i< scoringProbability; i++){
                scoringProbabilityTable.push("S")
            }
            for (let i=0; i< missingProbability; i++){
                scoringProbabilityTable.push("M")
            }

        }

        scoring = scoringProbabilityTable[getRandomInt(0,10)]
        if (scoring === "S"){
            console.log("GOALLLL this is a nice GOAL")
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




export default Scoring