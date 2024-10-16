import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password, email });
      console.log(response.data);
      // 处理成功注册
    } catch (error) {
      console.error(error);
      // 处理错误
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="用户名" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="电子邮箱" required />
      <button type="submit">注册</button>
    </form>
  );
}

export default Register;
