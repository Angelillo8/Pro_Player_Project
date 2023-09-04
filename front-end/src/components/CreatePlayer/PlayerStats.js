import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PlayerStatsDisplay from "./PlayerStatsDisplay";


const PlayerStats = ({formData, setFormData, player, points, setPoints})=>{

    const listOfTheStats = {
        gk: ["positioning", "diving", "handling", "kicking", "reflexes", "reactions", "composure"],
        def: ["slide_tackle", "stand_tackle", "aggression", "interceptions", "strength", "balance", "jumping", "heading"],
        mid: ["ball_control", "vision", "crossing", "short_pass", "long_pass", "stamina", "agility", "long_shot"],
        att: ["dribbling", "at_positioning", "sprint_speed", "shot_power", "finishing", "fk_accuracy", "penalties", "volleys"]
    }
   

    const colourToSkills = (skillNumber) => {
        if (skillNumber >= 0 && skillNumber < 60) {
            return "bg-red-500"
        } else if (skillNumber >= 60 && skillNumber < 70) {
            return "bg-orange-500"
        } else if (skillNumber >= 70 && skillNumber < 80) {
            return "bg-yellow-400"
        } else if (skillNumber >= 80 && skillNumber < 90) {
            return "bg-lime-400"
        } else {
            return "bg-green-700"
        }
    };
    

  

    const goalkeeperCard = listOfTheStats.gk.map((stats, index) =>{
        return <PlayerStatsDisplay key={index} stats = {stats} player = {player} setFormData = {setFormData} formData = {formData} points = {points} setPoints={setPoints}/>
    })
    const defenceCard = listOfTheStats.def.map((stats, index) =>{
        return <PlayerStatsDisplay key={index} stats = {stats} player = {player} setFormData = {setFormData} formData = {formData} points = {points} setPoints={setPoints}/>
    })
    const midFieldCard = listOfTheStats.mid.map((stats, index) =>{
        return <PlayerStatsDisplay key={index} stats = {stats} player = {player} setFormData = {setFormData} formData = {formData} points = {points} setPoints={setPoints}/>
    })
    const attackCard = listOfTheStats.att.map((stats, index) =>{
        return <PlayerStatsDisplay key={index} stats = {stats} player = {player} setFormData = {setFormData} formData = {formData} points = {points} setPoints={setPoints}/>
    })



    return(
        <>
            <div className="flex flex-row justify-around" >
                <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                    <div className="mt-auto mb-auto">
                        <p>Overall</p>
                    </div>
                    <div className={"border-solid  rounded-lg w-15 h-10 text-white  text-center   " + colourToSkills(formData.overall)}>
                        <p className="p-2">{formData.overall}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                    <div className="mt-auto mb-auto">
                        <p>Points</p>
                    </div>
                    <div className="border-solid  rounded-lg w-15 h-10   text-center  ">
                        <p>{points}</p>
                    </div>
                </div>

            </div>
            <div className="flex flex-row gap-2">
                <div className="basis-1/4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Goalkeeper</h2>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                                {goalkeeperCard}
                                <div>
                                    <div className={"border-solid p-2 rounded-lg w-12 text-white m-auto "}>none</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Defence</h2>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                              {defenceCard}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Mid Field</h2>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                              {midFieldCard}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Attack</h2>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-5 place-items-start">
                                {attackCard}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PlayerStats