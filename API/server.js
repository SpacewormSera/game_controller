// ensure the port number matches the default one or the one you specified from the command line
//

const webSocket = new WebSocket('ws://localhost:8080');
 
webSocket.addEventListener('message', message => {
  console.log(JSON.parse(message.data));
});
 
webSocket.addEventListener('open', () => {
 
  webSocket.send(JSON.stringify({
    type:'echo',
    payload: 'test',
  }));
 
});