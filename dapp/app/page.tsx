"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0xe541D317f761599b5B01Af140C438Dd301f308f3";
    const tokenSymbol = "DRA";
    const tokenDecimal = 18;
    const tokenImage = "https://static.hiphopdx.com/2023/12/drake-introduces-his-newest-alter-ego-complete-with-its-own-accesory-1200x675.jpg";

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
            image: tokenImage,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  return (
    <main style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundImage: 'url("https://i.wpimg.pl/1200x788/filerepo.grupawp.pl/api/v1/display/embed/5a754f28-670a-4666-a5f4-93dc4bca1d1f")', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
      <p style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px', color: '#000000' }}>
        Drake Mint/Staking (Anita Max Wynn)
      </p>
  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={connectWallet}
          className="p-3 bg-black text-white rounded"
          style={{ marginBottom: '10px', border: '10px solid #000000' }}
        >
          {walletKey !== "" ? walletKey : "Connect Wallet"}
        </button>
  
        <button
          onClick={importToken}
          className="p-3 bg-black text-white rounded"
          style={{ border: '2px solid #000000' }}
        >
          Import Token
        </button>
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #000000', padding: '10px', marginBottom: '20px' }}>
        <form>
          <label style={{ fontSize: '18px', color: '#000000' }}>Ready to mint some tokens? Enter the amount you want to create and let the magic happen! 💎✨</label><br />
        </form>
        <input
          type="number"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          style={{ color: 'black', marginBottom: '10px', padding: '8px', fontSize: '16px', border: '1px solid #000000' }}
        />
        <button
          onClick={mintCoin}
          className="p-3 bg-black text-white rounded"
          style={{ border: '2px solid #000000' }}
        >
          Mint Token
        </button>
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #000000', padding: '10px', marginBottom: '20px' }}>
        <form>
          <label style={{ fontSize: '18px', color: '#000000' }}>Input the amount you'd like to stake right here and watch your investment grow! 💰🌱</label><br />
        </form>
        <input
          type="number"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          style={{ color: 'black', marginBottom: '10px', padding: '8px', fontSize: '16px', border: '1px solid #000000' }}
        />
        <button
          onClick={stakeCoin}
          className="p-3 bg-black text-white rounded"
          style={{ border: '2px solid #000000' }}
        >
          Stake It
        </button>
      </div>
  
      <div style={{ border: '2px solid #000000', padding: '10px', marginBottom: '20px' }}>
        <label style={{ fontSize: '18px', color: '#000000' }}>Patience pays off! Just one more minute to go before you seize the moment and withdraw. 🚀💸</label>
        <br />
        <button
          onClick={withdrawCoin}
          className="p-3 bg-black text-white rounded"
          style={{ border: '2px solid #000000' }}
        >
          Withdraw
        </button>
      </div>
    </main>
  );
  
}