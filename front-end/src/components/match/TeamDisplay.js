import PlayerDisplay from "./PlayerDisplay"

const TeamDisplay = ({team, teamScorers})=>{

  const teamArray = [team.gk]
  teamArray.push(...team.def, ...team.mid, ...team.st)

const allPlayers = teamArray.map((player, index)=>{
  const howManyTimesScored = teamScorers.filter((scorer) => player.id === scorer.id)
  return <PlayerDisplay key={index} player = {player}  index = {index} numberOfGoals={howManyTimesScored.length}/>
})

return(
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Number</th>
        <th>Name</th>
        <th>Position</th>
        <th>Goals</th>
      </tr>
    </thead>
    <tbody>
        {allPlayers}
    </tbody>
  </table>
    {/* <ul>
        {allPlayers}
    </ul> */}
</div>
)

}

export default TeamDisplay