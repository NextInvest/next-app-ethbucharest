"use client";

// @refresh reset
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

export const RainbowKitCustomConnectButton = () => {
  const { isConnected, address } = useAccount();
  const [userHasAccount, setUserHasAccount] = useState(true);
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const { push } = useRouter();
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();

  const checkAccountExists = async (address: string) => {
    setIsCheckingAccount(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    setIsCheckingAccount(false);
    throw `Account for ${address} not found`;
  };

  const checkUserAccount = async (userAddress: string) => {
    setIsCheckingAccount(true);
    try {
      await checkAccountExists(userAddress);
      setUserHasAccount(true);
    } catch (error) {
      console.error(error);
      setUserHasAccount(false);
    } finally {
      setIsCheckingAccount(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkUserAccount(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isConnected && !userHasAccount && !isCheckingAccount) {
      push("/signup");
    }
  }, [isConnected, userHasAccount, isCheckingAccount]);

  // const handleConnect = async (openConnectModal: () => void, address: string) => {
  //   setIsLoading(true);
  //   const exists = await checkAccountExists(address);
  //   setIsLoading(false);

  //   if (exists) {
  //     openConnectModal();
  //   } else {
  //     console.error('No account found. Please sign up.');
  //   }
  // };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (isCheckingAccount) return <button disabled>Checking Account...</button>;
              else if (!connected) {
                return (
                  <button
                    className={"text-gray-400 py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col"}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <>
                  <div className="flex flex-col items-center mr-1">
                    <Balance address={account.address as Address} className="min-h-0 h-auto" />
                    <span className="text-xs" style={{ color: networkColor }}>
                      {chain.name}
                    </span>
                  </div>
                  <AddressInfoDropdown
                    address={account.address as Address}
                    displayName={account.displayName}
                    ensAvatar={account.ensAvatar}
                    blockExplorerAddressLink={blockExplorerAddressLink}
                  />
                  <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
