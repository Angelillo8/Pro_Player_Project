import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { Menu } from 'antd';



const NavBar = ({player}) => {
  return (
    <>
    {player && (
    <div className="navbar bg-base-100">
      <Link to={"/home/" + player.id} className="btn btn-ghost normal-case text-xl w-1/6">Home</Link>
      <Link to={"/players/" + player.id} className="btn btn-ghost normal-case text-xl w-1/6">Player</Link>
      <Link to={"/teams/" + player.team.id} className="btn btn-ghost normal-case text-xl w-1/6">Squad</Link>
      <Link to={"/calendar"+ player.team.id} className="btn btn-ghost normal-case text-xl w-1/6">Calendar</Link>
      <Link to="/leagues" className="btn btn-ghost normal-case text-xl w-1/6">League</Link>
      <p className="btn btn-ghost normal-case text-xl w-1/6">Exp</p>
    </div>
    )}
    </>
  );
};
export default NavBar;
