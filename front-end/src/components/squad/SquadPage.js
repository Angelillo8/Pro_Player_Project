import React from "react";
import DisplaySquad from "./DisplaySquad";
import "daisyui/dist/full.css";

const SquadPage = ({ squad }) => {
  // const players = [{name: "Micheal", position: "ST", overall: 70, age: 20, id: 5, number : 5},{name: "Micheal", position: "ST", overall: 70, age: 20, id: 4, number:5},{name: "Micheal", position: "ST", overall: 70, age: 20, id: 3, number : 5}]
  if (!squad) {
    return;
  }
  console.log(squad);
  const AllPlayers = squad.players.map((player, index) => {
    return <DisplaySquad player={player} index={index} key={player.id} />;
  });

  return (
    <div className="m-auto mt-6 mb-6 w-10/12">
      <div className="card w-12/13 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{squad.name}</h2>
          <h1>overall: {squad.ovr}</h1>
          <h3>Rooster</h3>
        </div>
        <figure>
          <table className="table table-xs">
            <thead>
              <tr>
                <th>No.</th>
                <th>Pos.</th>
                <th>Name</th>
                <th></th>
                <th></th>
                <th>Overall</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>{AllPlayers}</tbody>
          </table>
        </figure>
      </div>
    </div>
  );
};

export default SquadPage;
