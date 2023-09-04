const PlayerDisplay = ({player, index, numberOfGoals})=>{

    return(
        
     <tr>
        <th>{index + 1}</th>
        <td>{player.kit_number}</td>
        <td>{player.name}</td>
        <td>{player.position}</td>
        <td> {numberOfGoals}</td>
      </tr>
    )


}
export default PlayerDisplay