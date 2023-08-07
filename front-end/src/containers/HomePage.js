import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LeagueTable from '../components/leaguetable/LeagueTable';
import NavBar from '../components/NavBar';
import LeagueTableCard from '../components/LeagueTableCard';
import EmailPage from '../components/EmailPage';
import PlayerDevelopment from '../components/PlayerDevelopment';
import ProplayerService from '../services/ProplayerService';


const HomePage = () => {
  const [matches, setMatches] = useState()
  const [ourPlayer, setOurPlayer] = useState(null)
  const [allMatchDates, setAllMatchDates] =useState([])
  const userID = useParams()
  console.log("players Id", userID)

  const getMatchDates = (matches)=>{
    const allDates = matches.map((match) => match.date)
    return [...new Set(allDates)]
  }

  useEffect(()=>{
    ProplayerService.getOnePlayer(userID.id)
      .then(player => setOurPlayer(player))
    ProplayerService.getMatches()
      .then((allMatches) => (setMatches(allMatches),setAllMatchDates(getMatchDates(allMatches))))
   
  },[])
  return (
    <div className="home-container h-screen">
     {ourPlayer?<LeagueTableCard ourPlayer={ourPlayer} date = {allMatchDates[0]}/>:null}
    </div>
  );
};

export default HomePage;






