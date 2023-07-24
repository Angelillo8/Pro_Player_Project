import React from 'react';
import { Link } from 'react-router-dom';
import LeagueTable from '../components/leaguetable/LeagueTable';
import NavBar from '../components/NavBar';
import LeagueTableCard from '../components/LeagueTableCard';
import EmailPage from '../components/EmailPage';
import PlayerDevelopment from '../components/PlayerDevelopment';


const HomePage = ({ourPlayer, date}) => {
  return (
    <div className="home-container h-screen">
     <LeagueTableCard ourPlayer={ourPlayer} date = {date}/>
    </div>
  );
};

export default HomePage;






