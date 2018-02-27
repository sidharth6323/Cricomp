import React from 'react';
import Header from './Header';
import Table from './Table';

class Card extends React.Component
{
  render(){
    return(
      <div className="card">
        <Header/>
        <Table/>
      </div>
    )
  }
}

export default Card;
