import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import CalendarPage from './components/CalendarPage';
import SquadPage from './components/squad/SquadPage';

import Timer from './components/match/Timer';
import PlayerDetails from './components/PlayerDetails';
import './App.css';
import PlayerSeasonStats from './components/PlayerSeasonStats.js';
import LeagueTable from './components/LeagueTable';
import ProplayerService from './services/ProplayerService';
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
import HomePageCard from './components/HomePageCard';
import NavBar from './components/NavBar';
import PlayerDevelopment from './components/PlayerDevelopment';
import { data } from 'autoprefixer';
function App() {

  const [teams, setTeams] = useState([]);
  let season = useRef()
  let allMatchhesAreCreated = useRef(false)
  const [matches, setMatches] = useState()
  const [ourPlayer, setOurPlayer] = useState(null)
  const [allMatchDates, setAllMatchDates] =useState([])

  console.log('ourPlayer :>> ', ourPlayer);

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

  const getOurPlayer = (player) => {
    setOurPlayer(player)
    window.localStorage.setItem("ourPlayer", JSON.stringify(player))
  };

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("ourPlayer")) != null) setOurPlayer(JSON.parse(localStorage.getItem("ourPlayer")))
  },[])
  const createSeason = () => {
    const startingSeason = { year: 2022 }
    if (!season.current) {
      ProplayerService.postNewSeason(startingSeason)
        .then((postedSeason) => season.current = postedSeason)
    }
  }

  const generateAllGames = () => {
    if (season && teams.length > 40 && !allMatchhesAreCreated.current) {
      let [championshipMatches, premierLeagueMatches,generatedDates] = GameGenerator(teams, season.current)
      console.log("championshipMatches[1]", championshipMatches[1])

      for (let match of premierLeagueMatches) {
        ProplayerService.postNewMatch(match)

      }
      for (let match of championshipMatches) {
        ProplayerService.postNewMatch(match)
      }

      ProplayerService.getMatches()
        .then((allMatches) => setMatches(allMatches))
      allMatchhesAreCreated.current = true
      setAllMatchDates(generatedDates)
    }

  }
  console.log("all dates are here", allMatchDates)
  createSeason()
  // generateAllGames()


  return (

    <Router>
      <NavBar player={ourPlayer}/>
      <Routes>
        <Route path="/" element={<SubmitForm
          createSeason={createSeason}
          generateAllGames={generateAllGames}
          getOurPlayer={getOurPlayer}
        />} />
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/squad" element={<SquadPage squad={teams[1]} />} />
        <Route path="/player" element={<PlayerSeasonStats />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/player-development" element={<PlayerDevelopment />} />
        <Route path="/league-table" element={<LeagueTable />} />
        <Route path='/decision' element={<Decision />} />
        {/* <Route path='/timer' element= {<Timer/>}/>  */}
        <Route path="/playerSeasonStats" element={<PlayerSeasonStats />} />

        {/* Angel below */}
        <Route path='/leagues' element={<LeaguesPage />} />
        <Route path='/teams/:teamId' element={<TeamPage />} />
        <Route path='/players/:playerId' element={<PlayerPage />} />
        <Route path="/player" element={<PlayerSeasonStats />} />
        <Route path='/decision' element={<DisplayDecisions />} />
        <Route path="/match/:matchId" element={<Match />} />
        {/* <Route path="/submit-form" element ={<SubmitForm 
        />}/> */}
        <Route path="/teams" element={<TeamPage />} />
      </Routes>
    </Router>
  );

}


export default App;