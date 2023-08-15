import React from "react";
import { Link } from 'react-router-dom';

const PlayerDevelopment = () => {
  return (
    <div className="m-auto mt-6 mb-6 w-10/12">
    <div>
      <div className="card card-side bg-base-100 shadow-xl col-span-2">
      
        <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png " />
          </div>
        </div>
          <p>Name:</p>
          <p>Age:</p>
          <p>Position:</p>
          <p>Preferred foot: Left</p>
          <div className="card-actions absolute top-0 right-0">
            <button className="btn btn-primary">Overall</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="card shadow-xl col-span-1">
          <div className="card-body">
            <h2 className="card-title">Goalkeeper</h2>
            <div className="flex items-center">
              <p className="w-1/2">Positioning</p>
              <progress className="progress progress-error w-1/2" value={10} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Gk Diving</p>
              <progress className="progress progress-error w-1/2" value={10} max="100"></progress>            </div>
            <div className="flex items-center">
              <p className="w-1/2">Gk Handling</p>
              <progress className="progress progress-error w-1/2" value={10} max="100"></progress>            </div>
            <div className="flex items-center">
              <p className="w-1/2">Gk Kicking</p>
              <progress className="progress progress-error w-1/2" value={10} max="100"></progress>            </div>
            <div className="flex items-center">
              <p className="w-1/2">Gk Reflexes</p>
              <progress className="progress progress-error w-1/2" value={10} max="100"></progress>            </div>
            <div className="card-actions justify-end"></div>
          </div>
          </div>
        <div className="card shadow-xl col-span-1">
          <div className="card-body">
            <h2 className="card-title">Defence</h2>
            <div className="flex items-center">
              <p className="w-1/2">Slid Tackle</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Standing Tackle</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Strength</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Jumping</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Interception</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Aggression</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Reaction</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Heading</p>
              <progress className="progress progress-warning w-1/2" value={10} max="100"></progress> 
            </div>
            <div className="card-actions justify-end"></div>
          </div>
          </div>
        <div className="card shadow-xl col-span-1">
          <div className="card-body">
            <h2 className="card-title">Midfield</h2>
            <div className="flex items-center">
              <p className="w-1/2">Short Pass</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Long Pass</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Ball Control</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Dribbling</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Vision</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Sprint Speed</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Agility</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Stamina</p>
              <progress className="progress progress-success w-1/2" value={65} max="100"></progress>
            </div>
            <div className="card-actions justify-end"></div>
          </div>
          </div>
        <div className="card shadow-xl col-span-1">
          <div className="card-body">
            <h2 className="card-title">Attack</h2>
            <div className="flex items-center">
              <p className="w-1/2">Finishing</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Shot Power</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Curve</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Long Shots</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Penalties</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Volleys</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Free Kicks</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="flex items-center">
              <p className="w-1/2">Crossing</p>
              <progress className="progress progress-warning w-1/2" value={67} max="100"></progress>
            </div>
            <div className="card-actions justify-end"></div>
          </div>
          </div>
    </div>
    </div>
    </div>
    
  );
};

export default PlayerDevelopment;
