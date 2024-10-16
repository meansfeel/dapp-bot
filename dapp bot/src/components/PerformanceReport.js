import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function PerformanceReport() {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get('/api/performance');
      setPerformanceData(response.data);
    } catch (error) {
      console.error('获取性能数据失败:', error);
    }
  };

  if (!performanceData) {
    return <div>加载中...</div>;
  }

  const chartData = {
    labels: performanceData.dates,
    datasets: [
      {
        label: '利润',
        data: performanceData.profits,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>性能报告</h2>
      <Line data={chartData} />
      <p>总利润: {performanceData.totalProfit}</p>
      <p>成功交易次数: {performanceData.successfulTrades}</p>
      <p>失败交易次数: {performanceData.failedTrades}</p>
    </div>
  );
}

export default PerformanceReport;
