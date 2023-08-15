const SingleMatchDisplay = ()=>{

    return(
        <div  className="carousel-item w-full">
          {/* <image/> */}
          <h1>{homeTeam.name}</h1>
            <h1>{homeTeamScore}  :  {awayTeamScore}</h1>
            <h1>{awayTeam.name}</h1>
            {/* <image/> */}
      </div>

    )
}
export default SingleMatchDisplay