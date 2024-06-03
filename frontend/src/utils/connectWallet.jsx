import { ethers, Contract } from "ethers";
import supplyABI from "../ABI/contractABI.json";
import { newKit } from "@celo/contractkit";

export const connectWallet = async () => {
	const kit = newKit(
		"https://celo-mainnet.infura.io/v3/ae2f202881ba41fe828a2650f5a4f109"
	);

	try {
		let [signer, provider, supplyContract, chainId, balance] = [
			null,
			null,
			null,
			null,
		];
		if (window.ethereum === null) {
			throw new Error("Metamask is not installed");
		}

		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});

		let chainIdHex = await window.ethereum.request({
			method: "eth_chainId",
		});
		chainId = parseInt(chainIdHex, 16);

		let selectedAccount = accounts[0];
		if (!selectedAccount) {
			throw new Error("No ethereum accounts available");
		}

		provider = new ethers.BrowserProvider(window.ethereum);
		signer = await provider.getSigner();

		const supplyContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
		supplyContract = new Contract(supplyContractAddress, supplyABI, signer);

		const celoToken = await kit.contracts.getGoldToken();
		const stableToken = await kit.contracts.getStableToken();
		const celoBalance = await celoToken.balanceOf(selectedAccount);
		const stableBalance = await stableToken.balanceOf(selectedAccount);

		if(window.ethereum) {
			balance = celoBalance.toString() / 1e18
		} else if (window.ethereum.isMinipay) {
			balance = stableBalance.toString() / 1e18
		}



		return { provider, selectedAccount, supplyContract, chainId, balance };
	} catch (error) {
		console.error(error);
		throw error;
	}
};