import React from "react"
import NavBar from '../components/NavBar'; 

const LeagueTable=()=>{
  

return(

<div className="overflow-x-auto">

  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th></th> 
        <th></th> 
        <th></th> 
        <th></th> 
        <th>P</th> 
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>PTS</th>
        </tr>
    </thead> 
    <tbody>
      <tr>
        <th>1</th> 
        <td>Arsenal</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>38</td> 
        <td>28</td>
        <td>5</td>
        <td>5</td>
        <td>89</td>
      </tr>
      <tr>
      <th>2</th> 
        <td>Man City</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>38</td> 
        <td>26</td>
        <td>6</td>
        <td>6</td>
        <td>84</td>
      </tr>
      <tr>
      <th>3</th> 
        <td>Man Utd</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>38</td> 
        <td>23</td>
        <td>6</td>
        <td>9</td>
        <td>75</td>
      </tr>
      <tr>
      <th>4</th> 
        <td>Liverpool</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>38</td> 
        <td>19</td>
        <td>14</td>
        <td>9</td>
        <td>71</td>
      </tr>
      <tr>
      <th>5</th> 
        <td>Man Utd</td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td>38</td> 
        <td>19</td>
        <td>10</td>
        <td>9</td>
        <td>67</td>
      </tr>
      </tbody> 
    </table>
</div>

)
}

export default LeagueTable
