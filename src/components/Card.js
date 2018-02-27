import React from 'react';
import Header from './Header';
import Table from './Table';


//Stateless Card component containing the main card in the center of the layout
const Card = function(props)
{
    return(
      <div className="card">
        <Header/>
        <Table/>
      </div>
    )
}
//exporting the component for outside imports
export default Card;
