import React from "react";
import { Link } from 'react-router-dom';
import LeagueTable from "./LeagueTable";
import PlayerDevelopment from "./PlayerDevelopment";
import AllMatchesOfWeek from "./weeklyMatches/AllMatchesOfWeek";

const HomePageCard = ({ourPlayer, date}) => {


  return (
    <>{ourPlayer&&(
    <div className="m-auto mt-6 mb-6 w-10/12">

    <div className="grid grid-cols-3  grid-rows-2 gap-2 gap-y-7">
      
        <div className="card shadow-xl h-auto pb-40 ">
          <figure className="px-40 pt-7 ">
            {/* <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" /> */}
            <img src={ourPlayer.team.badge} alt="Logo"  />
          </figure>
          <div className="card-body items-center text-center ">
            <p>Saturday, Aug 12, 2023</p>
            <p>AWAY vs Mancity</p>
            <div className="card-actions">
              <Link to="/match/" className="btn btn-primary">Play Match</Link>
            </div>
          </div>
        </div>

        <div className="card  shadow-xl col-span-2  ">
          <figure className="px-10 pt-10">
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">News</h2>
            <AllMatchesOfWeek date={date}/>
            <div className="card-actions"></div>
          </div>
        </div>


      
        <Link to="/league-table" className="card shadow-xl row-span-1 items-center text-center ">
        <h2 className="card-title ">League Table</h2>
        <figure className="px-20 pt-7">
          <img src="https://e0.365dm.com/18/08/2048x1152/skysports-graphic-premier-league_4377324.jpg?20180801105247" alt="Logo"  />
        </figure>
          <div className="card-body items-center text-center">
            <div className="card-actions"></div>
            <LeagueTable />
            </div>
        </Link>

        <div className="card  shadow-xl row-span-1">
        <div className="card-body items-center text-center">
            <h2 className="card-title">Notifications</h2>
            <figure className="px-20 pt-7">
            <img src="https://www.freepnglogos.com/uploads/email-logo-png-27.png" alt="Logo"  />
          </figure>
            <div className="card-actions"></div>
            <Link to="/email" className="btn btn-primary">View Emails</Link>
          </div>
        </div>

        <div className="card  shadow-xl row-span-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Development</h2>
          <figure className="px-20 pt-7">
            <img src="https://freepngimg.com/download/football/66114-soccer-photography-football-royalty-free-player-stock-playing.png" alt="Logo"  />
          </figure>
            <div className="card-actions"></div>
            <Link to="/player-development" className="btn btn-primary">My Development</Link>
            </div>
        </div>
      
    </div>
    </div>
    )}
    </>
  );
};

export default HomePageCard;

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // <div className="flex flex-col ">
    // <div class="grid grid-cols-3 gap-4" >
    //   <div className="card  bg-base-100 shadow-xl h-1/4">
    //     {/* <figure><img src="https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png" alt="Logo" /></figure> */}
    //     <div className="card-body">
        //   <p>Saturday, Feb 10, 2023 <br></br>
        //   AWAY vs Arsenal <br></br>
    //       <Link to="/match" className="btn btn-primary">Play Match</Link></p>
    //       <div className="card-actions justify-end">
    //     </div>
    //     </div>
    //   </div>

    //    <div className="card bg-base-100 shadow-xl col-span-2 h-3/5"> 
    //   <Link to="/" >

    //     <h1 className = "card-title place-content-center">News</h1>
    //   <div className="card-body">

    //     <figure><img className="image-full" src="https://logowik.com/content/uploads/images/premier-league9031.jpg" alt="News"/></figure>
    //       {/* <div className="card-actions justify-end"></div> */}
    //     </div>    
    
    //   </Link>
    //   </div>
    // </div>
    

    
        
        // <div className="grid grid-cols-3 ">
        //   <Link to="/match" className="card w-96 bg-base-100 shadow-xl box-border h-60 p-4 border-2 basis-1/4">
        //       <h1 className="card-title">PLAY MATCH</h1>
            //   <p>Saturday, Feb 10, 2023</p>
            //   <p>AWAY vs Arsenal</p>
            //   {/* <figure><img src="https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png" alt="Logo" /></figure> */}
        //       <div className="card-body">
        //         <div className="card-actions justify-end"></div>
        //       </div>
        //     </Link>
            
        //     <Link to="/" className="card w-96 bg-base-100 shadow-xl box-border h-100 p-4 border-2 col-span-2 basis-1/2">
        //       <h1 className="card-title place-content-center">Standings</h1>
        //       <figure>
                // <img src="https://www.premierleague.com/news/3486457" alt="Shoes" />
        //       </figure>
        //       <div className="card-body">
        //         <div className="card-actions justify-end"></div>
        //       </div>
        //     </Link>
        //     <Link to="/league-table" className="card w-96 bg-base-100 shadow-xl">
        //       <h1 className="card-title place-content-center">Standings</h1>
        //       <figure>
        //         <img src="https://logowik.com/content/uploads/images/premier-league9031.jpg" alt="Shoes" />
        //       </figure>
        //       <div className="card-body">
        //         <div className="card-actions justify-end"></div>
        //       </div>
        //     </Link>

        //     <Link to="/league-table" className="card w-96 bg-base-100 shadow-xl">
        //       <h1 className="card-title place-content-center">Standings</h1>
        //       <figure>
        //         <img src="https://www.vecteezy.com/free-vector/mail-icon" alt="Shoes" />
        //       </figure>
        //       <div className="card-body">
        //         <div className="card-actions justify-end"></div>
        //       </div>
        //     </Link>

        //     <Link to="/league-table" className="card w-96 bg-base-100 shadow-xl">
        //       <h1 className="card-title place-content-center">Standings</h1>
        //       <figure>
        //         <img src="https://logowik.com/content/uploads/images/premier-league9031.jpg" alt="Shoes" />
        //       </figure>
        //       <div className="card-body">
        //         <div className="card-actions justify-end"></div>
        //       </div>
        //     </Link>
          
        // </div>

