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
      console.log("Get message from server: " + e.data)
      setMessage("Get message from server: " + e.data)
    };

    return () => {
      socket.close()
    }

  }, []);  
 
  const handleClick = (e) => {
    e.preventDefault()
    const message = {      
      type:"echo",
      payload: e.target.innerText
    }
    socket.send(JSON.stringify(message))
  }

  function disconnect () {
    console.log('disconnected')    
  }

  function connect() {
    console.log('connected', connectionStatus)
  }  

  return (
    <>    
      <div className="wrapper">
        <div className="buttonblock2">
          <div className="grid-item"></div>
          <div className="grid-item"><button className="button" onClick={handleClick}>UP</button></div>
          <div className="grid-item"></div>
          <div className="grid-item"><button className="button" onClick={handleClick}>LEFT</button></div>
          <div className="grid-item"></div>
          <div className="grid-item"><button className="button">RIGHT</button></div>
          <div className="grid-item"></div>
          <div className="grid-item"><button className="button">DOWN</button></div>
          <div className="grid-item"></div>
        </div>
        <div className="buttonblock3">
          <div className="grid-item"><button className="button">Select</button></div>
          <div className="grid-item"><button className="button">Start</button></div>          
        </div>
        <div>
          <div className="buttonblock1"> 
            <div className="grid-item"><button className="button">A</button></div>
            <div className="grid-item"><button className="button">B</button></div>
            <div className="grid-item"><button className="button">C</button></div>
            <div className="grid-item"><button className="button">D</button></div>
          </div>
        </div>

        {/* <div>{!connectionStatus ?
          <button onClick={connect}>Connect to server</button>    :
          <button onClick={disconnect}>Disconnect from server</button>
        }</div> */}

      </div>
    </>
  )
}