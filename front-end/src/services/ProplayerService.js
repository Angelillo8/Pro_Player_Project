const baseURL = 'http://localhost:8080/'


const ProplayerService = {

  // FOR PLAYERS

  getPlayers() {
    return fetch(baseURL + "players")
      .then(res => res.json());
  },

  getOnePlayer(id) {
    return fetch(baseURL + "players/" + id)
      .then(res => res.json());
  },

  postNewPlayer(payload) {

    return fetch(baseURL + "players", {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  },

  updatePlayer(payload) {
    return fetch(baseURL + "players/" + payload.id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  // FOR TEAMS

  getTeams() {
    return fetch(baseURL + "teams")
      .then(res => res.json());
  },

  getOneTeam(id) {
    return fetch(baseURL + "teams/" + id)
      .then(res => res.json());
  },

  updateTeams(payload) {
    return fetch(baseURL + "teams/" + payload._id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  // FOR LEAGUES

  getLeagues() {
    return fetch(baseURL + "leagues")
      .then(res => res.json());
  },

  getOneLeague(id) {
    return fetch(baseURL + "leagues/" + id)
      .then(res => res.json());
  },

  // FOR MATCHES

  getMatches() {
    return fetch(baseURL + "matches")
      .then(res => res.json());
  },

  getOneMatch(id) {
    console.log(id)
    return fetch(baseURL + "matches/" + id)
      .then(res => res.json());
  },
  getMatchesByDate(date) {
    return fetch(baseURL + "matches/date/" + date)
      .then(res => res.json());
  },

  postNewMatch(payload) {

    return fetch(baseURL + "matches", {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .catch((err) => {
        console.log("error", err)
        console.error(err)
      })
  },

  updateMatch(payload) {
    return fetch(baseURL + "matches/" + payload._id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  // FOR SEASON

  getSeasons() {
    return fetch(baseURL + "seasons")
      .then(res => res.json());
  },

  getOneSeason(id) {
    return fetch(baseURL + "seasons/" + id)
      .then(res => res.json());
  },

  postNewSeason(payload) {
    return fetch(baseURL + "seasons", {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  },
};

export default ProplayerService;

// export const deleteProplayer (id) => {
//   return fetch(baseURL + id, {
//     method: 'DELETE'
//   });
// };