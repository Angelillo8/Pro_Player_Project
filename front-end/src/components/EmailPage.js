import React from "react";
import { Link } from 'react-router-dom';

const EmailPage = () => {
  return (
    
    <div className="grid grid-rows-6 grid-col-2 gap-2 ">
      <div className="card shadow-xl ">
        <div className="card-body  ">
          <p>Date: 20/07/2023</p>
          <p>From: Manager</p>
          <p>To: Angelito</p>
          <p>Subject: Season Objective</p>
          <div className="card-actions">
          </div>
        </div>
      </div>

      
      <div className="card shadow-xl row-span-6 ">
      <figure className="px-10 pt-7">
        <img src="https://fifastatic.fifaindex.com/FIFA23/teams/light/1.png" alt="Logo"  />
      </figure>
        <div className="card-body ">
          {/* <h2 className="card-title">News</h2> */}
          <p class="text-left"> Good Afternoon Angelito,<br></br>

          Hope you're doing well. With the new season just around the corner, I wanted to outline our objectives for the upcoming season. Your performance last season was exceptional, and I'm confident you'll continue to shine. This season, we're setting a goal for you to score a minimum of 15 goals and provide at least 10 assists. Your goal-scoring ability and playmaking skills are top-notch, and I know you can achieve this. Your positive presence on the pitch and leadership will be essential in motivating the team. Keep up the hard work and dedication to make this season even more memorable. Looking forward to a successful season ahead! <br></br>

Best regards, <br></br>

Manager</p>
          <div className="card-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
