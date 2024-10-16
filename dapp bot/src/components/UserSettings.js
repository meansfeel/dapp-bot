import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserSettings() {
  const [settings, setSettings] = useState({
    tradingPairs: [],
    maxTradeAmount: 0,
    minProfitPercentage: 0,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/user/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('获取用户设置失败:', error);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/settings', settings);
      alert('设置已保存');
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>用户设置</h2>
      <div>
        <label>交易对:</label>
        <input
          type="text"
          name="tradingPairs"
          value={settings.tradingPairs.join(',')}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>最大交易金额:</label>
        <input
          type="number"
          name="maxTradeAmount"
          value={settings.maxTradeAmount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>最小利润百分比:</label>
        <input
          type="number"
          name="minProfitPercentage"
          value={settings.minProfitPercentage}
          onChange={handleChange}
        />
      </div>
      <button type="submit">保存设置</button>
    </form>
  );
}

export default UserSettings;
