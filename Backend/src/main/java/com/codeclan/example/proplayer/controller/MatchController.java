package com.codeclan.example.proplayer.controller;


import com.codeclan.example.proplayer.models.*;
import com.codeclan.example.proplayer.repository.LeagueRepository;
import com.codeclan.example.proplayer.repository.MatchRepository;
import com.codeclan.example.proplayer.utilities.MatchHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MatchController {

    @Autowired
    MatchRepository matchRepository;

    @GetMapping("/matches")
    public ResponseEntity<List<Match>> getAllMatches(){
        return new ResponseEntity<>(matchRepository.findAll(), HttpStatus.OK);}

    @GetMapping(value="/matches/{id}")
    public ResponseEntity<Optional<Match>> getMatch(@PathVariable Long id) {
        return new ResponseEntity(matchRepository.findById(id), HttpStatus.OK);
    }
    @GetMapping(value="/matches/date/{date}")
    public ResponseEntity<Optional<Match>> getMatch(@PathVariable String date) {
        return new ResponseEntity(matchRepository.findByDate(date), HttpStatus.OK);
    }
    @PostMapping("/matches")
    public ResponseEntity<Match> postMatch(@RequestBody Match match){
        matchRepository.save(match);
        return new ResponseEntity<>(match, HttpStatus.CREATED);
    }

    @PutMapping(value="/matches/{id}")
    public ResponseEntity<Match> putMatch(@RequestBody Match match, @PathVariable Long id){
        Match matchToUpdate = matchRepository.findById(id).get();
        MatchHelper.updateMatch(matchToUpdate,match);
        matchRepository.save(matchToUpdate);
        return new ResponseEntity<>(matchToUpdate, HttpStatus.OK);
    }



}
