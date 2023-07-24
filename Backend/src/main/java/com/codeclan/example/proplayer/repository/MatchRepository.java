package com.codeclan.example.proplayer.repository;

import com.codeclan.example.proplayer.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByDate(String date);

}
