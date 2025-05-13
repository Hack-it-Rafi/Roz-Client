import PageTitle from "@/components/page-title";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import ScreenshotButton from "../screenshotButton";
// import { useRef } from 'react';

const Navbar = () => {
  const account = useCurrentAccount();
//   const captureRef = useRef<HTMLDivElement>(null);
  const { data, isPending, error } = useSuiClientQuery("getBalance", {
    owner: account?.address + "",
  });

  function getAccountBalance(): string {
    if (isPending) return "Loading...";
    if (error) return "Error";
    const balanceInSui = data ? Number(data.totalBalance) / 10 ** 9 : 0;
    return balanceInSui.toFixed(2);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-4 px-20 py-4 border-b-2">
      <PageTitle title="Agents" />
      <div className="flex justify-end my-2 items-center">
        <ConnectButton />
        {account && (
          <div className="ml-4 flex items-center gap-2">
            <span>{getAccountBalance()}</span>
            <img
              src="https://assets.crypto.ro/logos/sui-sui-logo.png"
              alt="SUI Logo"
              className="w-6 h-6"
            />
          </div>
        )}
      </div>
      <ScreenshotButton />
    </div>
  );
};

export default Navbar;
