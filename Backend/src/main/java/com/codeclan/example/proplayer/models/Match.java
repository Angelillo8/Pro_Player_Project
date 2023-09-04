package com.codeclan.example.proplayer.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "matches")
public class Match implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private String date;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @ManyToOne
    @JsonIgnoreProperties({"matches", "league"})
    @JoinColumn(name="team_home_id", nullable=false)
    private Team teamHome;

    @Column(name = "team_home_goals")
    private int teamHomeGoals;

    @ManyToOne
    @JsonIgnoreProperties({"matches", "league"})
    @JoinColumn(name="team_away_id", nullable=false)
    private Team teamAway;

    @Column(name = "team_away_goals")
    private int teamAwayGoals;

    @ManyToOne

    @JsonIgnoreProperties({"matches", "league", "teams"})
    @JoinColumn(name= "league_id", nullable=false )
    private League league;


    @ManyToOne
    @JsonIgnoreProperties({"matches"})
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;


    public Match(){
    }

    public Match(String date, Boolean isFinished, Team teamHome, int teamHomeGoals, Team teamAway, int teamAwayGoals, League league, Season season) {
        this.date = date;
        this.isFinished = isFinished;
        this.teamHome = teamHome;
        this.teamHomeGoals = teamHomeGoals;
        this.teamAway = teamAway;
        this.teamAwayGoals = teamAwayGoals;
        this.league = league;
        this.season = season;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getFinished() {
        return isFinished;
    }

    public void setFinished(Boolean finished) {
        isFinished = finished;
    }

    public Team getTeamHome() {
        return teamHome;
    }

    public void setTeamHome(Team teamHome) {
        this.teamHome = teamHome;
    }

    public int getTeamHomeGoals() {
        return teamHomeGoals;
    }

    public void setTeamHomeGoals(int teamHomeGoals) {
        this.teamHomeGoals = teamHomeGoals;
    }

    public Team getTeamAway() {
        return teamAway;
    }

    public void setTeamAway(Team teamAway) {
        this.teamAway = teamAway;
    }

    public int getTeamAwayGoals() {
        return teamAwayGoals;
    }

    public void setTeamAwayGoals(int teamAwayGoals) {
        this.teamAwayGoals = teamAwayGoals;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }
}
