import React, { useState } from 'react';
import Web3 from 'web3';

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('连接钱包失败:', error);
      }
    } else {
      alert('请安装MetaMask或其他以太坊钱包');
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>已连接钱包: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>连接钱包</button>
      )}
    </div>
  );
}

export default WalletConnect;
