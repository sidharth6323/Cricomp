import React from 'react';


//Stateless Header component containing the header of the card
const Header = function(props)
{
    return(
      <div className="header">
        <span className="icon">S</span>
        <h2>Live Stocks App</h2>
      </div>
    )
}
//exporting the component for outside imports
export default Header;
