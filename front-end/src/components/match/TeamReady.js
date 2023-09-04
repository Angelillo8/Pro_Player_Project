const TeamReady = (team)=>{
    const updateTeam = {
        gk:{},
        def:[],
        mid:[],
        st:[]
    }
    const allPlayers = team.filter((player)=> !player.substitute )
    for(let player of allPlayers){
        if(player.user_player){
            updateTeam.st.push(player) 
            break;
        }
    }
    const allgk = allPlayers.filter((player)=> player.position === "GK" ).sort((a,b)=> a.ovr > b.ovr ? -1 : 1)
    updateTeam.gk = allgk[0]
    if (allPlayers.some((player)=>player.position === "ST")){
        
        if (allPlayers.some((player) => player.position === "CF")){
            
            const alldef = allPlayers.filter((player)=> player.position.endsWith("B") ).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            for(let i=0; i < 4; i++){
                updateTeam.def.push(alldef[i])
            }
            const allmid = allPlayers.filter((player)=> player.position.endsWith("M")).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            for(let i=0; i < 4; i++){
                updateTeam.mid.push(allmid[i])
            }
            const allst = allPlayers.filter((player)=> player.position === "CF" || player.position === "ST").sort((a, b) => a.ovr > b.ovr? -1 : 1)
            if (updateTeam.st){
                if(updateTeam.st[0].position === "CF"){
                    for(let player of allst){
                        if (player.position === "ST" && !player.user_player){
                            updateTeam.st.push(player)
                            break;
                        }
                    }
                }else{
                    for(let player of allst){
                        if (player.position === "CF" && !player.user_player){
                            updateTeam.st.push(player)
                            break;

                        }
                    }
                }
            }
            else{
                for(let i=0; i < 2; i++){
                    updateTeam.st.push(allst[i])
                }

            }

            return updateTeam
        }else if(allPlayers.some((player) => player.position === "RW")){
            const alldef = allPlayers.filter((player)=> player.position.endsWith("B") ).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            for(let i=0; i < 4; i++){
                updateTeam.def.push(alldef[i])
            }
            const allmid = allPlayers.filter((player)=> player.position.endsWith("M")).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            for(let i=0; i < 3; i++){
                updateTeam.mid.push(allmid[i])
            }
            const allst = allPlayers.filter((player)=> player.position.endsWith("W") || player.position === "ST").sort((a, b) => a.ovr > b.ovr? -1 : 1)
            if (updateTeam.st){
                let playerCounter = 2
                if(updateTeam.st[0].position === "ST"){
                    for(let player of allst){
                        if ((player.position === "RW"  || player.position === "LW")  && !player.user_player){
                            updateTeam.st.push(player)
                           playerCounter--
                           console.log("this is the counter", playerCounter)
                        }
                        if(playerCounter === 0 ){
                            break;
                        }
                    }
                }else if(updateTeam.st[0].position === "RW") {
                    for(let player of allst){
                        if ((player.position === "ST"  ||  player.position === "LW") && !player.user_player){
                            updateTeam.st.push(player)
                            playerCounter--

                        }
                        if(playerCounter === 0 ){
                            break;
                        }
                    }
                }else{
                    for(let player of allst){
                        if ((player.position === "RW"  || player.position === "ST" ) && !player.user_player){
                            updateTeam.st.push(player)
                           playerCounter--
                        }
                        if(playerCounter === 0 ){
                            break;
                        }
                    }
                }
            }
            else{
                for(let i=0; i < 3; i++){
                    updateTeam.st.push(allst[i])
                }

            }
 

            return updateTeam
        }else{
            const alldef = allPlayers.filter((player)=> player.position.endsWith("B") ).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            for(let i=0; i < 4; i++){
                updateTeam.def.push(alldef[i])
            }
            const allmid = allPlayers.filter((player)=> (player.position.endsWith("M") && player.position != "CAM")).sort((a, b) => a.ovr > b.ovr? -1 : 1)
            console.log("allMid length", allmid)
            for(let i=0; i < 4; i++){
                updateTeam.mid.push(allmid[i])
            }
            const allst = allPlayers.filter((player)=> player.position === "CAM" || player.position === "ST").sort((a, b) => a.ovr > b.ovr? -1 : 1)
            if (updateTeam.st.length>0){
                if(updateTeam.st[0].position === "CAM"){
                    for(let player of allst){
                        if (player.position === "ST" && !player.user_player){
                            updateTeam.st.push(player)
                            break;
                        }
                    }
                }else{
                    for(let player of allst){
                        if (player.position === "CAM" && !player.user_player){
                            updateTeam.st.push(player)
                            break;

                        }
                    }
                }
            }
            else{
                for(let i=0; i < 2; i++){
                    updateTeam.st.push(allst[i])
                }

            }

            return updateTeam
        }
    }
    const alldef = allPlayers.filter((player)=> player.position.endsWith("B") ).sort((a, b) => a.ovr > b.ovr? -1 : 1)
    for(let i=0; i < 5; i++){
        updateTeam.def.push(alldef[i])
    }
    const allmid = allPlayers.filter((player)=> player.position.endsWith("M")).sort((a, b) => a.ovr > b.ovr? -1 : 1)
    for(let i=0; i < 3; i++){
        updateTeam.mid.push(allmid[i])
    }
    const allst = allPlayers.filter((player)=> player.position.endsWith("S")).sort((a, b) => a.ovr > b.ovr? -1 : 1)
    if (updateTeam.st.length > 0){
        if(updateTeam.st[0].position === "RS"){
            for(let player of allst){
                if (player.position === "LS" && !player.user_player){
                    updateTeam.st.push(player)
                    break;
                }
            }
        }else{
            for(let player of allst){
                if (player.position === "RS" && !player.user_player){
                    updateTeam.st.push(player)
                    break;

                }
            }
        }
    }
    else{
        for(let i=0; i < 2; i++){
            updateTeam.st.push(allst[i])
        }

    }

    return updateTeam


}
export default TeamReady