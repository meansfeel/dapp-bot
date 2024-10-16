import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import BotInterface from './BotInterface';
import WalletConnect from './WalletConnect';
import PerformanceReport from './PerformanceReport';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [latestTrade, setLatestTrade] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
    connectSocket();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
    } catch (error) {
      console.error('获取用户数据失败:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('获取交易记录失败:', error);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('newTrade', (trade) => {
      setLatestTrade(trade);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>{t('Welcome')}, {user?.username}</h1>
      <WalletConnect />
      <BotInterface />
      <PerformanceReport />
      <h2>最近交易</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.type} - {transaction.amount} - {transaction.status}
          </li>
        ))}
      </ul>
      {latestTrade && (
        <div>
          <h2>最新交易</h2>
          <ul>
            <li key={latestTrade._id}>
              {latestTrade.type} - {latestTrade.amount} - {latestTrade.status}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
