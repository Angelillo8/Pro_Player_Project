import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProplayerService from "../services/ProplayerService";
import LeagueCard from "../components/LeagueCard";
import TeamCard from "../components/TeamCard";

const LeaguesPage = () => {

    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null)

    const getLeagues = () => {
        ProplayerService.getLeagues()
            .then((leaguesData) =>
                setLeagues(leaguesData)
            );
    };

    useEffect(() => {
        if (leagues.length === 0) {
            getLeagues();
        };
    }, [leagues]);

    const leaguesList = leagues.map((league) => {
        return <LeagueCard
            key={league.id}
            league={league}
            setSelectedLeague={setSelectedLeague}
        />
    })

    const teamsByLeagueList = selectedLeague?.teams?.map((team) => {
        return <TeamCard
            key={team.id}
            team={team}
        />
    })
    // console.log('selectedLeague :>> ', selectedLeague);

    return (
        <>
            <div className="m-auto mt-6 mb-6 w-10/12">
                <div className="flex flex-wrap gap-7 justify-center">{leaguesList}</div>
                <div className="flex flex-wrap gap-3 justify-center mt-6">{selectedLeague && teamsByLeagueList}</div>
            </div>
        </>
    )
};

export default LeaguesPage;

