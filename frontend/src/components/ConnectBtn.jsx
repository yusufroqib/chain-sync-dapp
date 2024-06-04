"use client";
import React, { useEffect, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import Identicon from "./ui/identicon";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const ConnectBtn = ({
	onClick,
	label,
	type,
	account,
	balance,
	chainId,
	handleDisconnect,
}) => {
	const [currency, setCurrency] = useState("");

	const handleCopy = () => {
		navigator.clipboard.writeText(account);
		toast.success("Copied to clipboard");
	};

	useEffect(() => {
		setCurrency(window.ethereum.isMiniPay ? "cUSD" : "CELO");
	}, [balance, account]);

	return (
		<>
			{!account || label === "Connecting..." ? (
				<button
					onClick={onClick}
					type={type}
					className=" bg-gray-800 flex items-center gap-2 justify-center border border-transparent text-white m-[2px] rounded-xl py-2 px-3 text-lg"
				>
					{label}
				</button>
			) : (
				<Popover avoidCollisions>
					<PopoverTrigger>
						<div className="flex cursor-pointer items-center rounded-xl bg-gray-700 py-0">
							{" "}
							<div className="text-white px-3 text-sm md:text-lg ">
								{balance > 0 ? balance.toFixed(3) : 0} {currency}
							</div>
							<div className="bg-gray-800 flex items-center gap-2 justify-center border border-transparent text-white m-[2px] rounded-xl p-2 text-sm md:text-lg">
								<div>
									{account.slice(0, 6)}...
									{account.slice(account.length - 4, account.length)}
								</div>
								<Identicon account={account} />
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent className="flex justify-between">
						<Button onClick={handleDisconnect}>Disconnect</Button>
						<Button variant={"outline"} onClick={handleCopy}>
							Copy
						</Button>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};

export default ConnectBtn;
