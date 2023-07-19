import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import CalendarPage from './components/CalendarPage';

import Decision from './logic/Decision';
import PlayerSeasonStats from './components/PlayerSeasonStats.js';
import LeagueTable from './components/LeagueTable';
import LeagueTableCard from './components/LeagueTableCard';


import SquadPage from './components/squad/SquadPage';
import Timer from './components/match/Timer' ;
import './App.css';


import ProplayerService from './services/ProplayerService';
import 'daisyui/dist/full.css';
import LeaguesPage from './pages/LeaguesPage';
import TeamPage from './pages/TeamPage'
import Match from './components/match/Match';
import DisplayDecisions from './components/match/DiaplayDecisions';

import SubmitForm from './components/SubmitForm';


import PlayerPage from './pages/PlayerPage';
import EmailPage from './components/EmailPage';
import LeagueCard from './components/LeagueCard';
import LeagueTableCard from './components/LeagueTableCard';
import LeagueTable from './components/LeagueTable';
import NavBar from './components/NavBar';
import PlayerDevelopment from './components/PlayerDevelopment';
function App() {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/teams')
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        
      })
  }, []);

  const [players, setPlayers] = useState([]);

useEffect(() => {
  fetch('http://localhost:8080/players')
    .then(response => response.json())
    .then(data => {
      setPlayers(data);
    });
}, []);

  console.log(teams)
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
        <Route path="/match" element = {<Match/>}/>
        <Route path="/submit-form" element ={<SubmitForm teams={teams} players={players} />}/>
        <Route path="/teams" element= {<TeamPage/>}/>
      </Routes>
    </Router>
  );
  
}


export default App;