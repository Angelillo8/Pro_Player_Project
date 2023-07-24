import React from "react"

const DisplayLeague = ({ team, index }) => {
    return(

        <tr>
        <th>{index + 1}</th> 
        <td>{team.name}</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>{team.plays}</td> 
        <td>{team.wins}</td>
        <td>{team.draws}</td>
        <td>{team.loses}</td>
        <td>{team.points}</td>
      </tr>

    );
};

export default DisplayLeague;