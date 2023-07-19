import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import CalendarPage from './components/CalendarPage';
import SquadPage from './components/squad/SquadPage';

import Timer from './components/match/Timer' ;
import PlayerDetails from './components/PlayerDetails';
import './App.css';
import PlayerSeasonStats from './components/PlayerSeasonStats.js';
import LeagueTable from './components/LeagueTable';
import LeagueTableCard from './components/LeagueTableCard';
import ProplayerService from './services/ProplayerService';
import 'daisyui/dist/full.css';
import LeaguesPage from './pages/LeaguesPage';
import TeamPage from './pages/TeamPage'
import Match from './components/match/Match';
import Decision from './logic/Decision';
import DisplayDecisions from './components/match/DiaplayDecisions';
import GameGenerator from './logic/GmeGenerator';
import SubmitForm from './components/SubmitForm';
import PlayerPage from './pages/PlayerPage';
import EmailPage from './components/EmailPage';
import LeagueCard from './components/LeagueCard';
import NavBar from './components/NavBar';
import PlayerDevelopment from './components/PlayerDevelopment';
function App() {

  const [teams, setTeams] = useState([]);
  let season = useRef()
  let allMatchhesAreCreated = useRef(false)
  const [matches, setMatches] = useState()



  useEffect(() => {
    
    fetch('http://localhost:8080/matches/1')
      .then(response => response.json())
      .then(data => {
        setMatches(data);
        
      })
      
  }, []);

  const [players, setPlayers] = useState([]);

useEffect(() => {
  fetch('http://localhost:8080/players/2')
    .then(response => response.json())
    .then(data => {
      setPlayers(data);
    });
}, []);

  console.log(teams)

  const createSeason=()=>{
    const startingSeason = {year: 2022}
    if(!season.current){
      ProplayerService.postNewSeason(startingSeason)
      .then((postedSeason) => season.current = postedSeason)
    }
 

  }

  const generateAllGames= ()=>{
    if(season && teams.length > 40  && !allMatchhesAreCreated.current){
      let [championshipMatches, premierLeagueMatches] = GameGenerator(teams, season)
      console.log("championshipMatches[1]", championshipMatches[1])
      ProplayerService.postNewMatch(championshipMatches[1])
      // for(let match of premierLeagueMatches){
      //   ProplayerService.postNewMatch(match)
      
      // }
      // for (let match of championshipMatches){
      //   ProplayerService.postNewMatch(match)
      // }
       
      // ProplayerService.getMatches()
      //   .then((allMatches) => setMatches(allMatches))
      allMatchhesAreCreated.current = true
    }

  }
  createSeason()
  generateAllGames()
 
  console.log(season)

  return (

  //   <div>
  //     <h1>List of Players</h1>
  //     <ul>
  //       {players.map(player => (
  //         <li key={player.id}>{player.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/squad" element={<SquadPage squad={teams[1]} />} />
        <Route path="/player" element={<PlayerSeasonStats/>} />
        <Route path="/email" element={<EmailPage/>} />
        <Route path="/player-development" element={<PlayerDevelopment/>} />
        <Route path="/league-table" element={<LeagueTable/>} /> 
        <Route path='/decision' element = {<Decision/>}/>
        {/* <Route path='/timer' element= {<Timer/>}/>  */}
        <Route path="/playerSeasonStats" element={<PlayerSeasonStats />} />
        
        {/* Angel below */}
        <Route path='/leagues' element= {<LeaguesPage/>}/> 
        <Route path='/teams/:teamId' element= {<TeamPage/>}/>
        <Route path='/players/:playerId' element= {<PlayerPage />}/>
        <Route path="/player" element={<PlayerSeasonStats />} />
        <Route path='/decision' element = {<DisplayDecisions/>}/>
        <Route path="/match" element = {<Match match={matches[0]}  ourPlayer={players}/>}/>
        <Route path="/submit-form" element ={<SubmitForm teams={teams} players={players} />}/>
        <Route path="/teams" element= {<TeamPage/>}/>
      </Routes>
    </Router>
  );
  
}


export default App;