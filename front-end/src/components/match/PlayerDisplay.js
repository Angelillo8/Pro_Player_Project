const PlayerDisplay = ({player, index})=>{

    return(
        
     <tr>
        <th>index</th>
        <td>{player.kit_number}</td>
        <td>{player.name}</td>
        <td>{player.position}</td>
      </tr>
    )


}
export default PlayerDisplay