import { ethers } from "ethers";

const connectButton = document.getElementById('connectButton');
const walletDetails = document.getElementById('walletDetails');
const walletAddress = document.getElementById('walletAddress');
const walletBalance = document.getElementById('walletBalance');

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Create a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Get the signer
            const signer = provider.getSigner();
            
            // Get the wallet address
            const address = await signer.getAddress();
            walletAddress.textContent = address;
            
            // Get the balance
            const balance = await signer.getBalance();
            walletBalance.textContent = ethers.utils.formatEther(balance);
            
            walletDetails.style.display = 'block';
        } catch (error) {
            console.error("Error connecting to MetaMask", error);
        }
    } else {
        alert('MetaMask is not installed!');
    }
}

connectButton.addEventListener('click', connectWallet);
