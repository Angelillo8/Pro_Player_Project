package com.codeclan.example.proplayer.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "players")
public class Player implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name = "user_player")
    private Boolean user_player ;
    @Column(name = "name")
    private String name ;
    @Column(name = "image")
    private String image ;
    @Column(name = "nationality")
    private String nationality ;
    @Column(name = "nationality_image")
    private String nationality_image ;
    @Column(name = "overall")
    private int overall ;
    @Column(name = "height")
    private int height ;
    @Column(name = "weight")
    private int weight ;
    @Column(name = " preferred_foot")
    private String  preferred_foot ;
    @Column(name = "birth_date")
    private String birth_date ;
    @Column(name = "age")
    private int age ;
    @Column(name = "position")
    private String position ;
    @Column(name = "substitute")
    private Boolean substitute ;
    @Column(name = "kit_number")
    private int kit_number ;
    @Column(name = "positioning")
    private int positioning ;
    @Column(name = "diving")
    private int diving ;
    @Column(name = "handling")
    private int handling ;
    @Column(name = "kicking")
    private int kicking ;
    @Column(name = "reflexes")
    private int reflexes ;
    @Column(name = "reactions")
    private int reactions ;
    @Column(name = "composure")
    private int composure ;
    @Column(name = "slide_tackle")
    private int slide_tackle ;
    @Column(name = "stand_tackle")
    private int stand_tackle ;
    @Column(name = "aggression")
    private int aggression ;
    @Column(name = "interceptions")
    private int interceptions ;
    @Column(name = "strength")
    private int strength ;
    @Column(name = "balance")
    private int balance ;
    @Column(name = "jumping")
    private int jumping ;
    @Column(name = "heading")
    private int heading ;
    @Column(name = "ball_control")
    private int ball_control ;
    @Column(name = "vision")
    private int vision ;
    @Column(name = " crossing")
    private int  crossing ;
    @Column(name = "short_pass")
    private int short_pass ;
    @Column(name = "long_pass")
    private int long_pass ;
    @Column(name = " stamina")
    private int  stamina ;
    @Column(name = "agility")
    private int agility ;
    @Column(name = "long_shot")
    private int long_shot ;
    @Column(name = "dribbling")
    private int dribbling ;
    @Column(name = "at_positioning")
    private int at_positioning ;
    @Column(name = "sprint_speed")
    private int sprint_speed ;
    @Column(name = "shot_power")
    private int shot_power ;
    @Column(name = "finishing")
    private int finishing ;
    @Column(name = "fk_accuracy")
    private int fk_accuracy ;
    @Column(name = "penalties")
    private int penalties ;
    @Column(name = "volleys")
    private int volleys ;
    @Column(name = "goals")
    private Integer goals ;
    @Column(name = "assistance")
    private Integer assistance ;
    @Column(name = "appearances")
    private Integer appearances ;
    @JsonIgnoreProperties({"players", "matches"})
    @ManyToOne
    @JoinColumn(name="team_id", nullable=false)
    private Team team;

    public Player(){

    }

    public Player(Boolean user_player, String name, String image, String nationality, String nationality_image, int overall, int height, int weight, String preferred_foot, String birth_date, int age, String position, Boolean substitute, int kit_number, int positioning, int diving, int handling, int kicking, int reflexes, int reactions, int composure, int slide_tackle, int stand_tackle, int aggression, int interceptions, int strength, int balance, int jumping, int heading, int ball_control, int vision, int crossing, int short_pass, int long_pass, int stamina, int agility, int long_shot, int dribbling, int at_positioning, int sprint_speed, int shot_power, int finishing, int fk_accuracy, int penalties, int volleys, Integer goals, Integer assistance, Integer appearances, Team team) {
        this.user_player = user_player;
        this.name = name;
        this.image = image;
        this.nationality = nationality;
        this.nationality_image = nationality_image;
        this.overall = overall;
        this.height = height;
        this.weight = weight;
        this.preferred_foot = preferred_foot;
        this.birth_date = birth_date;
        this.age = age;
        this.position = position;
        this.substitute = substitute;
        this.kit_number = kit_number;
        this.positioning = positioning;
        this.diving = diving;
        this.handling = handling;
        this.kicking = kicking;
        this.reflexes = reflexes;
        this.reactions = reactions;
        this.composure = composure;
        this.slide_tackle = slide_tackle;
        this.stand_tackle = stand_tackle;
        this.aggression = aggression;
        this.interceptions = interceptions;
        this.strength = strength;
        this.balance = balance;
        this.jumping = jumping;
        this.heading = heading;
        this.ball_control = ball_control;
        this.vision = vision;
        this.crossing = crossing;
        this.short_pass = short_pass;
        this.long_pass = long_pass;
        this.stamina = stamina;
        this.agility = agility;
        this.long_shot = long_shot;
        this.dribbling = dribbling;
        this.at_positioning = at_positioning;
        this.sprint_speed = sprint_speed;
        this.shot_power = shot_power;
        this.finishing = finishing;
        this.fk_accuracy = fk_accuracy;
        this.penalties = penalties;
        this.volleys = volleys;
        this.goals = goals;
        this.assistance = assistance;
        this.appearances = appearances;
        this.team = team;
    }

    public Boolean getUser_player() {
        return user_player;
    }

    public void setUser_player(Boolean user_player) {
        this.user_player = user_player;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getNationality_image() {
        return nationality_image;
    }

    public void setNationality_image(String nationality_image) {
        this.nationality_image = nationality_image;
    }

    public int getOverall() {
        return overall;
    }

    public void setOverall(int overall) {
        this.overall = overall;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getPreferred_foot() {
        return preferred_foot;
    }

    public void setPreferred_foot(String preferred_foot) {
        this.preferred_foot = preferred_foot;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Boolean getSubstitute() {
        return substitute;
    }

    public void setSubstitute(Boolean substitute) {
        this.substitute = substitute;
    }

    public int getKit_number() {
        return kit_number;
    }

    public void setKit_number(int kit_number) {
        this.kit_number = kit_number;
    }

    public int getPositioning() {
        return positioning;
    }

    public void setPositioning(int positioning) {
        this.positioning = positioning;
    }

    public int getDiving() {
        return diving;
    }

    public void setDiving(int diving) {
        this.diving = diving;
    }

    public int getHandling() {
        return handling;
    }

    public void setHandling(int handling) {
        this.handling = handling;
    }

    public int getKicking() {
        return kicking;
    }

    public void setKicking(int kicking) {
        this.kicking = kicking;
    }

    public int getReflexes() {
        return reflexes;
    }

    public void setReflexes(int reflexes) {
        this.reflexes = reflexes;
    }

    public int getReactions() {
        return reactions;
    }

    public void setReactions(int reactions) {
        this.reactions = reactions;
    }

    public int getComposure() {
        return composure;
    }

    public void setComposure(int composure) {
        this.composure = composure;
    }

    public int getSlide_tackle() {
        return slide_tackle;
    }

    public void setSlide_tackle(int slide_tackle) {
        this.slide_tackle = slide_tackle;
    }

    public int getStand_tackle() {
        return stand_tackle;
    }

    public void setStand_tackle(int stand_tackle) {
        this.stand_tackle = stand_tackle;
    }

    public int getAggression() {
        return aggression;
    }

    public void setAggression(int aggression) {
        this.aggression = aggression;
    }

    public int getInterceptions() {
        return interceptions;
    }

    public void setInterceptions(int interceptions) {
        this.interceptions = interceptions;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getJumping() {
        return jumping;
    }

    public void setJumping(int jumping) {
        this.jumping = jumping;
    }

    public int getHeading() {
        return heading;
    }

    public void setHeading(int heading) {
        this.heading = heading;
    }

    public int getBall_control() {
        return ball_control;
    }

    public void setBall_control(int ball_control) {
        this.ball_control = ball_control;
    }

    public int getVision() {
        return vision;
    }

    public void setVision(int vision) {
        this.vision = vision;
    }

    public int getCrossing() {
        return crossing;
    }

    public void setCrossing(int crossing) {
        this.crossing = crossing;
    }

    public int getShort_pass() {
        return short_pass;
    }

    public void setShort_pass(int short_pass) {
        this.short_pass = short_pass;
    }

    public int getLong_pass() {
        return long_pass;
    }

    public void setLong_pass(int long_pass) {
        this.long_pass = long_pass;
    }

    public int getStamina() {
        return stamina;
    }

    public void setStamina(int stamina) {
        this.stamina = stamina;
    }

    public int getAgility() {
        return agility;
    }

    public void setAgility(int agility) {
        this.agility = agility;
    }

    public int getLong_shot() {
        return long_shot;
    }

    public void setLong_shot(int long_shot) {
        this.long_shot = long_shot;
    }

    public int getDribbling() {
        return dribbling;
    }

    public void setDribbling(int dribbling) {
        this.dribbling = dribbling;
    }

    public int getAt_positioning() {
        return at_positioning;
    }

    public void setAt_positioning(int at_positioning) {
        this.at_positioning = at_positioning;
    }

    public int getSprint_speed() {
        return sprint_speed;
    }

    public void setSprint_speed(int sprint_speed) {
        this.sprint_speed = sprint_speed;
    }

    public int getShot_power() {
        return shot_power;
    }

    public void setShot_power(int shot_power) {
        this.shot_power = shot_power;
    }

    public int getFinishing() {
        return finishing;
    }

    public void setFinishing(int finishing) {
        this.finishing = finishing;
    }

    public int getFk_accuracy() {
        return fk_accuracy;
    }

    public void setFk_accuracy(int fk_accuracy) {
        this.fk_accuracy = fk_accuracy;
    }

    public int getPenalties() {
        return penalties;
    }

    public void setPenalties(int penalties) {
        this.penalties = penalties;
    }

    public int getVolleys() {
        return volleys;
    }

    public void setVolleys(int volleys) {
        this.volleys = volleys;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Integer getGoals() {
        return goals;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getAssistance() {
        return assistance;
    }

    public void setAssistance(Integer assistance) {
        this.assistance = assistance;
    }

    public Integer getAppearances() {
        return appearances;
    }

    public void setAppearances(Integer appearances) {
        this.appearances = appearances;
    }
}
