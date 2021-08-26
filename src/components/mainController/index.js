import React, {useState, useRef, useEffect} from 'react'
import './index.css'


export function MainController() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('')

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      console.log('>> socket opened');

      const message = {
        event: 'connection',
        username,
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message))
    }

    socket.current.onmessage = (event) => {
      const message = event.data;
      console.log(message);
      // setMessages(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('socket closed');
    }

    socket.current.onerror = () => {
      console.log('socket error');
    }

    
  }
 
  const sendMsg = async () => {
    const message = {
      event: 'message',
      username,
      id: Date.now()
    }
    socket.current.send(JSON.stringify(message));
  }

  return (
    <>    
      <div class="grid-container">
        <div class="grid-container">
          <div class="grid-item"></div>
          <div class="grid-item"><button className="button">UP</button></div>
          <div class="grid-item"></div>
          <div class="grid-item"><button className="button">LEFT</button></div>
          <div class="grid-item"></div>
          <div class="grid-item"><button className="button">RIGHT</button></div>
          <div class="grid-item"></div>
          <div class="grid-item"><button className="button">DOWN</button></div>
          <div class="grid-item"></div>
        </div>
        
        <div class="grid-container">
          <div class="grid-item"><button className="button">Select</button></div>
          <div class="grid-item"><button className="button">Start</button></div>          
        </div>
        <div>
          <div class="grid-container"> 
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"><button className="button">A</button></div>
            <div class="grid-item"></div>
            <div class="grid-item"><button className="button">B</button></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
          </div>
        </div>
          
      </div>
    </>
  )
}