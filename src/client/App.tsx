import React, { useState, useEffect } from 'react';
import socket from './socket';

function App() {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    function handleChange(value: number) {
      setValue(value);
    }

    socket.on('value', handleChange);
    return () => {
      socket.removeListener('value', handleChange);
    };
  }, []);

  // Event Handlers
  const handleButtonPress = () => {
    socket.emit('click');
  };

  return <div>
    <h1>Hello World!</h1>
    <p>
      This counter is global to all users that visit this page, it gets reset when you restart the server.
    </p>
    <p>
      Value: <b>{value}</b>
    </p>
    <button onClick={handleButtonPress}>Send Click</button>
  </div>;
}

export default App;
