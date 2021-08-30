import React, {useEffect, useState} from 'react'
import './index.css'

const socket = new WebSocket('ws://localhost:8080');

export function MainController() {
  const [message, setMessage] = useState('');
  const [connectionStatus, setconnectionStatus] = useState(false);

  useEffect(() => {
    socket.onopen = () => {
      setMessage('connected');
      setconnectionStatus(true);
    };

    socket.onmessage = (e) => {
      console.log("Get message from server: " + e.data);
    };

    return () => {
      socket.close();
    }

  }, []);  
 
  const handleClick = (e) => {
    e.preventDefault();
    const message = {      
      type:"echo",
      payload: e.target.innerText
    }
    socket.send(JSON.stringify(message));
  }

  return (
    <>    
      <div className="container">   

        <div className="buttonblock1">
          <button className="button" onClick={handleClick}>UP</button>
          <button className="button" onClick={handleClick}>LEFT</button>
          <button className="button"></button>
          <button className="button" onClick={handleClick}>RIGHT</button>

          <button className="button" onClick={handleClick}>DOWN</button>

        </div>

        <div className="buttonblock2">
          <button className="button" onClick={handleClick}>Select</button>
          <button className="button" onClick={handleClick}>Start</button>          
        </div>
        
          <div className="buttonblock3"> 
            <button className="button" onClick={handleClick}>A</button>
            <button className="button" onClick={handleClick}>B</button>
            <button className="button" onClick={handleClick}>C</button>
            <button className="button" onClick={handleClick}>D</button>
          </div>
        

        {/* <div>{!connectionStatus ?
          <button onClick={connect}>Connect to server</button>    :
          <button onClick={disconnect}>Disconnect from server</button>
        }</div> */}

      </div>
    </>
  )
}