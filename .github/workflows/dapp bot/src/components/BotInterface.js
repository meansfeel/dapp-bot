import React, { useState } from 'react';
import axios from 'axios';

function BotInterface() {
  const [isRunning, setIsRunning] = useState(false);
  const [profit, setProfit] = useState(0);

  const toggleBot = async () => {
    try {
      const response = await axios.post('/api/bot/toggle');
      setIsRunning(response.data.isRunning);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>套利机器人</h2>
      <button onClick={toggleBot}>{isRunning ? '停止' : '启动'}</button>
      <p>当前盈利: {profit}</p>
    </div>
  );
}

export default BotInterface;
