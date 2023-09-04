import React, { useEffect, useState } from "react";
import ProplayerService from "../../services/ProplayerService";
import { useNavigate } from "react-router-dom";
import PlayersInfo from "./PlayersInfo";
import TeamInfo from "./TeamInfo";
import PlayerStats from "./PlayerStats";


// function calculateOverall(formData){
//   const listOfTheStats = ["positioning", "diving", "handling", "kicking", "reflexes", "reactions", "composure",
//     "slide_tackle", "stand_tackle", "aggression", "interceptions", "strength", "balance", "jumping", "heading",
//     "ball_control", "vision", "crossing", "short_pass", "long_pass", "stamina", "agility", "long_shot",
//     "dribbling", "at_positioning", "sprint_speed", "shot_power", "finishing", "fk_accuracy", "penalties", "volleys"]

//     let totalStats = listOfTheStats.map((stat) => formData[stat]).reduce((total, currentStat) => total + currentStat, 0)
//     return totalStats/listOfTheStats.length

// }

function SubmitForm({ createSeason, generateAllGames, getOurPlayer }) {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [points, setPoints] = useState(50)
  const [step, setStep] = useState(0)
  const [teams, setTeams] = useState([])
  const [formData, setFormData] = useState({
    name: "", 
    user_player: true,
    image: "https://fifastatic.fifaindex.com/FIFA23/players/271464.png",
    nationality: "",
    nationality_image: "https://fifastatic.fifaindex.com/FIFA21/images/flags/10/219.png",
    overall: 54,
    height: 183,
    weight: 81,
    preferred_foot: "",
    birth_date: "",
    age: 0,
    position: "",
    substitute: false,
    kit_number: 0,
    positioning: 40,
    diving: 40,
    handling: 40,
    kicking: 40,
    reflexes: 40,
    reactions: 40,
    composure: 40,
    slide_tackle: 40,
    stand_tackle: 40,
    aggression: 40,
    interceptions: 40,
    strength: 40,
    balance: 55,
    jumping: 55,
    heading: 55,
    ball_control: 55,
    vision: 55,
    crossing: 55,
    short_pass: 55,
    long_pass: 55,
    stamina: 55,
    agility: 55,
    long_shot: 55,
    dribbling: 55,
    at_positioning: 55,
    sprint_speed: 55,
    shot_power: 55,
    finishing: 55,
    fk_accuracy: 55,
    penalties: 55,
    volleys: 55,
    goals: 0,
    assistance: 0,
    appearances: 0,
    team: {}
  });
  const [baseStats, setBaseStats] = useState({
    kit_number: 0,
    positioning: 40,
    diving: 40,
    handling: 40,
    kicking: 40,
    reflexes: 40,
    reactions: 40,
    composure: 40,
    slide_tackle: 40,
    stand_tackle: 40,
    aggression: 40,
    interceptions: 40,
    strength: 40,
    balance: 55,
    jumping: 55,
    heading: 55,
    ball_control: 55,
    vision: 55,
    crossing: 55,
    short_pass: 55,
    long_pass: 55,
    stamina: 55,
    agility: 55,
    long_shot: 55,
    dribbling: 55,
    at_positioning: 55,
    sprint_speed: 55,
    shot_power: 55,
    finishing: 55,
    fk_accuracy: 55,
    penalties: 55,
    volleys: 55,})

  const getTeams = () => {
    ProplayerService.getTeams()
      .then((teamsData) =>
        setTeams(teamsData.filter((team)=> team.league.id === 1))
      );
  };

  const getCountriesFromApi = () =>{
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then((allCountries) => setCountries([...allCountries]))
  }

  useEffect(() => {
    
    getTeams();
    getCountriesFromApi()

  }, []);

  // useEffect(() =>{
  //   const newOverall = calculateOverall(formData)
  //   const tempFormData = {...formData}
  //   tempFormData.overall = newOverall
  //   // setFormData(tempFormData)
  //   localStorage.setItem("localFormData", JSON.stringify(formData))

  // },[formData])

  


  const generateplayer = (form) => {
    const player = {
      name: form.name, 
      "user_player": true,
      "image": "https://fifastatic.fifaindex.com/FIFA23/players/271464.png",
      "nationality": "Kosovo",
      "nationality_image": "https://fifastatic.fifaindex.com/FIFA21/images/flags/10/219.png",
      "overall": 54,
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
      .then(player => (getOurPlayer(player),  generateAllGames(), navigate(`/home/${player.id}`)))
    // console.log(ourPlayer)
    // createSeason()
    // generateAllGames()
    // Process form submission or send data to an API
    // console.log(formData);
    // navigate(`/home/${ourPla}`)
  };

  return (
    <>
      <div className="m-auto mt-6 mb-6 w-fit">
        <div className="card w-fit bg-base-100 shadow-xl m-auto">
          <figure className="w-36 m-auto"><img src="https://logowik.com/content/uploads/images/760_ball_vector_file.jpg" alt="Ball" /></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">WELCOME TO PROPLAYER</h2>
            <p>Create your player</p>
            { step === 0?   <ul className="steps">
                      <li className="step step-primary">Player</li>
                      <li className="step ">Team</li>
                      <li className="step">Stats</li>
                    </ul>:
              step === 1 ?<ul className="steps">
                      <li className="step step-primary">Player</li>
                      <li className="step step-primary">Team</li>
                      <li className="step">Stats</li>
                    </ul>:
                    <ul className="steps">
                      <li className="step step-primary">Player</li>
                      <li className="step step-primary">Team</li>
                      <li className="step step-primary">Stats</li>
                    </ul>}
            <div className="" onSubmit={handleSubmit}>
            {step ===0 ?<PlayersInfo formData={formData} setFormData={setFormData} countries={countries}/>: 
            step === 1 ? <TeamInfo formData={formData} setFormData={setFormData} teams={teams}/> : <PlayerStats player={baseStats} formData={formData} setFormData={setFormData} points = {points} setPoints = {setPoints}/>}
              <div className="card-actions justify-center">
                <button 
                  className="btn btn-primary" 
                  disabled = {step === 0}
                  type="primary" 
                  onClick={() => setStep((prevStep) => prevStep - 1)}>
                  Previous Step
                </button>
                <button 
                  className="btn btn-primary" 
                  type="primary" 
                  disabled = {step > 1}
                  onClick={()=> setStep((prevStep) => prevStep + 1)}>
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );


}

export default SubmitForm;