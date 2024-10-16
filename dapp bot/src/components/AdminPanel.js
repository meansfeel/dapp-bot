import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get('/api/admin/users');
      const transactionsResponse = await axios.get('/api/admin/transactions');
      setUsers(usersResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>管理员后台</h1>
      <h2>用户列表</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>
      <h2>交易记录</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>{transaction.amount} - {transaction.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
