import { useState } from "react"
import TeamCard from "../TeamCard"

var jerseyNumbers = ()=>{
    let allNumbers = []
    for (let i = 0; i <= 90; i++){
        allNumbers.push(i)
    }
    return allNumbers
}

const TeamInfo = ({formData, setFormData, teams}) =>{
    const [teamNumber, setTeamNumber] = useState()


  const teamOptions = teams.map((team, index) => {
    return (
      <option key={team.id} value={index}>
        {team.name}
      </option>
    );
  });


  const availableNumbers = (team)=>{
    const availableNumbers =  jerseyNumbers().filter((number) => !team.players.some( (player) => player.kit_number === number))
        .map((number, index) => <option key ={index} value={number}>{number}</option>)
    return availableNumbers
  }

    const handleChange = (event)=>{

        if(event.target.name === "team"){
            setTeamNumber(event.target.value)
            return setFormData({...formData, [event.target.name]: teams[event.target.value]})
        }
        return setFormData({...formData, [event.target.name]: event.target.value})
   
    }


    return(
        <div>
             <label>
                <div className="form-control">
                  <div className="input-group">
                    <span className="w-24">Team</span>
                    <select name="team" onChange={handleChange} className="select select-bordered w-52" required >
                      <option value="" disabled selected>Select your team</option>
                      {teamOptions}
                    </select>
                  </div>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <div className="input-group">
                    <span className="w-24">Position</span>
                    <select name="position" onChange={handleChange} className="select select-bordered w-52" required>
                      <option value="" disabled selected>Select your position</option>
                      <option value={"ST"}>ST</option>
                      <option value={"RW"}>RW</option>
                      <option value={"LW"}>LW</option>
                    </select>
                  </div>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <div className="input-group">
                    <span className="w-24">Preferable Foot</span>
                    <select name="position" onChange={handleChange} className="select select-bordered w-52" required>
                      <option value="" disabled selected>Select Foot</option>
                      <option value={"right"}>Right</option>
                      <option value={"left"}>Left</option>
                    </select>
                  </div>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <div className="input-group">
                    <span className="w-24">Jersey Number</span>
                    <select name="position" onChange={handleChange} className="select select-bordered w-52" >
                      {teamNumber ? null :<option value="" disabled selected>Select a team first</option>}
                        {teamNumber ? availableNumbers(teams[teamNumber]) : null}
                    </select>
                  </div>
                </div>
              </label>
              <br />
        </div>
    )
}

export default TeamInfo