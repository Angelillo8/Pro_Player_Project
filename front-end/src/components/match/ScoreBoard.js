const ScoreBoard = ({homeTeam, awayTeam, score})=>{

    return(
        <div  className="items-center w-screen px-20" >
        <div className="flex items-center w-screen">
            <div className="flex grow text-center items-center">
            <img src = {homeTeam.badge} className="w-14"/>
            <h1>{homeTeam.name}</h1>
            </div>
            <h1>{score.homeTeam}  :  {score.awayTeam}</h1>
            <div className="flex grow text-center items-center">
            <h1>{awayTeam.name}</h1>
            <img src={awayTeam.badge} className="w-14"/>
            </div>
        </div>
        </div>

    )
}
export default ScoreBoard