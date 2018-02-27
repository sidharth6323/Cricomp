import React from 'react';
import TimeAgo from 'react-timeago'

class Table extends React.Component
{
  constructor(){
    super();
    var ws = new WebSocket("ws://stocks.mnet.website");
    this.state={};
    ws.onopen = ()=>{console.log("connection is open");}
    ws.onmessage = (evt)=> {
        var received_msg = JSON.parse(evt.data);
        received_msg.forEach(([name, price]) => {
          let tempobj={};
          var className="";
          if(this.state[name])
           className = this.state[name]["price"]>price?'red':'green';
          tempobj[name]={"price":price,"time":new Date(),"className":className}
          this.setState(tempobj);
        });
        console.log(this.state);
    };
    window.onbeforeunload = function(event) {
      ws.close();
    };
  }

  render(){
    return(
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state).map(function(key) {
                return <tr key={key}>
                          <td className="ticker"><span className={this.state[key]['className']}></span>{key}</td>
                          <td>$ {this.state[key]["price"].toFixed(3)}</td>
                          <td className="time"><TimeAgo date={this.state[key]["time"]} /></td>
                        </tr>;
            }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;
