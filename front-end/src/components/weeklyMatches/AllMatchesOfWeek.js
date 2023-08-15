import { useEffect, useState } from "react"
import ProplayerService from "../../services/ProplayerService"
import SingleMatch from "./SingleMatch"


const AllMatchesOfWeek = ({date}) =>{

    const [allMatchesOfThisWeek, setAllMatchesOfThisWeek] = useState([])

    useEffect(()=>{
        ProplayerService.getMatchesByDate(date)
            .then(matches => setAllMatchesOfThisWeek(matches))
    },[])

    // if (!allMatchesOfThisWeek){
    //     return
    // }
    console.log("Those are the matches of week " , allMatchesOfThisWeek)
    console.log("That is the date of the game " , date)
    const displayMatches = allMatchesOfThisWeek?.map((match)=>{
        return <SingleMatch key={match.id} match ={match}/>
    })

    return(
        <div className="carousel rounded-box">
        {displayMatches}
    </div>
    )

}

export default AllMatchesOfWeek