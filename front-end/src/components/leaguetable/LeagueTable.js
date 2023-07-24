import React from "react";
import DisplayLeague from "./DisplayLeague";
import "daisyui/dist/full.css";

const LeagueTable = ({ league }) => {
  
  if (!league) {
    return;
  }
  console.log(league);
  const AllTeams = league[0].teams.map((team, index) => {
    return <DisplayLeague team={team} index={index} key={team.id} />;
  });

  return (
    <div className="m-auto mt-6 mb-6 w-10/12">
      <div className="card w-12/13 bg-base-100 shadow-xl">
        <div className="card-body">
        </div>
        <figure>
          <table className="table table-xs">
            <thead>
              <tr>
              <th>No.</th> 
        <td>Team</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>Plays</td> 
        <td>Wins</td>
        <td>Draws</td>
        <td>Loses</td>
        <td>Points</td>
              </tr>
            </thead>
            <tbody>{AllTeams}</tbody>
          </table>
        </figure>
      </div>
    </div>
  );
};

export default LeagueTable;

// const LeagueTable=()=>{

// return(

// <div className="overflow-x-auto">
//   <table className="table table-xs">
//     <thead>
//       <tr>
//         <th></th> 
//         <th></th> 
//         <th></th> 
//         <th></th> 
//         <th></th> 
//         <th>P</th> 
//         <th>W</th>
//         <th>D</th>
//         <th>L</th>
//         <th>PTS</th>
//         </tr>
//     </thead> 
//     <tbody>
      
//       <tr>
//       <th>2</th> 
//         <td>Man City</td> 
//         <td></td> 
//         <td></td> 
//         <td></td> 
//         <td>38</td> 
//         <td>26</td>
//         <td>6</td>
//         <td>6</td>
//         <td>84</td>
//       </tr>
//       <tr>
//       <th>3</th> 
//         <td>Man Utd</td> 
//         <td></td> 
//         <td></td> 
//         <td></td> 
//         <td>38</td> 
//         <td>23</td>
//         <td>6</td>
//         <td>9</td>
//         <td>75</td>
//       </tr>
//       </tbody> 
//     </table>
// </div>

// )
// }

// export default LeagueTable
