import React from 'react';
import TimeAgo from 'react-timeago'


//Table component containing the main stocks table
class Table extends React.Component
{
  constructor(){
    super();
    var ws = new WebSocket("ws://stocks.mnet.website"); //opening the WebSocket connection
    this.state={};
    ws.onopen = ()=>{console.log("connection is open");}; //handle open event of WebSocket
    ws.onmessage = (evt)=>{this.handleMessage(evt)};  //handle message event of WebSocket
    window.onbeforeunload = (event)=>{ws.close()};  //close the connection of WebSocket
  }
  //function to update stock data
  handleMessage(evt){
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
//exporting the component for outside imports
export default Table;
