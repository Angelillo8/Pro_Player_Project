import SingleMatchDisplay from "./SingleMatchDisplay"

const MatchDisplay = ({weekMatches})=>{
    const allWeekMatches = weekMatches.map((match)=>{
        return <SingleMatchDisplay/>
    })
    return(
    <div className="carousel w-full">
        {allWeekMatches}
    </div>

    )
}
export default MatchDisplay