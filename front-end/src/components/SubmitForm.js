import React, { useEffect, useState } from "react";
import ProplayerService from "../services/ProplayerService";
import { useNavigate } from "react-router-dom";


function SubmitForm({ createSeason, generateAllGames, getOurPlayer }) {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    team: "",
    position: "",
  });

  const getTeams = () => {
    ProplayerService.getTeams()
      .then((teamsData) =>
        setTeams(teamsData)
      );
  };

  useEffect(() => {
    if (teams.length === 0) {
      getTeams();
    };
  }, [teams]);



  const generateplayer = (form) => {
    const player = {
      name: form.name, "user_player": true,
      "image": "https://fifastatic.fifaindex.com/FIFA23/players/271464.png",
      "nationality": "Kosovo",
      "nationality_image": "https://fifastatic.fifaindex.com/FIFA21/images/flags/10/219.png",
      "overall": 74,
      "height": 183,
      "weight": 81,
      "preferred_foot": "right foot",
      "birth_date": "Nov. 7, 1998",
      "age": parseInt(form.age),
      "position": form.position,
      "substitute": false,
      "kit_number": 10,
      "positioning": 40,
      "diving": 40,
      "handling": 40,
      "kicking": 40,
      "reflexes": 40,
      "reactions": 40,
      "composure": 40,
      "slide_tackle": 40,
      "stand_tackle": 40,
      "aggression": 40,
      "interceptions": 40,
      "strength": 40,
      "balance": 55,
      "jumping": 55,
      "heading": 55,
      "ball_control": 55,
      "vision": 55,
      "crossing": 55,
      "short_pass": 55,
      "long_pass": 55,
      "stamina": 55,
      "agility": 55,
      "long_shot": 55,
      "dribbling": 55,
      "at_positioning": 55,
      "sprint_speed": 55,
      "shot_power": 55,
      "finishing": 55,
      "fk_accuracy": 55,
      "penalties": 55,
      "volleys": 55,
      "goals": 0,
      "assistance": 0,
      "appearances": 0,
      "team": teams[form.team]
    }

    return player
  }

  const teamOptions = teams.map((team, index) => {
    return (
      <option key={team.id} value={index}>
        {team.name}
      </option>
    );
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ourPlayer = generateplayer(formData)
    ProplayerService.postNewPlayer(ourPlayer)
      .then(ourPlayer => getOurPlayer(ourPlayer))
    // console.log(ourPlayer)
    // createSeason()
    generateAllGames()
    // Process form submission or send data to an API
    // console.log(formData);
    navigate("/home")
  };

  return (
    <>
      <div className="m-auto mt-6 mb-6 w-10/12">
        <div className="card w-96 bg-base-100 shadow-xl m-auto">
          <figure className="w-36 m-auto"><img src="https://logowik.com/content/uploads/images/760_ball_vector_file.jpg" alt="Ball" /></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">WELCOME TO PROPLAYER</h2>
            <p>Create your player</p>
            <form className="" onSubmit={handleSubmit}>
              <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Name</span>
                    <input type="text" placeholder="Enter the name" className="input input-bordered w-52" name="name" value={formData.name} onChange={handleInputChange} />
                  </label>
                </div>
              </label>

              <br />
              <label>

                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Age</span>
                    <input type="text" placeholder="Enter the age" className="input input-bordered w-52" name="age" value={formData.age} onChange={handleInputChange} />
                  </label>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <div className="input-group">
                    <span className="w-24">Team</span>
                    <select name="team" onChange={handleInputChange} className="select select-bordered w-52" >
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
                    <select name="position" onChange={handleInputChange} className="select select-bordered w-52" >
                      <option value="" disabled selected>Select your position</option>
                      <option value={"ST"}>ST</option>
                      <option value={"RW"}>RW</option>
                      <option value={"LW"}>LW</option>
                    </select>
                  </div>
                </div>
              </label>
              <br />
              <div className="card-actions justify-center">
                <button className="btn btn-primary" type="primary" itemType="submit">Create player</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  );


}

export default SubmitForm;