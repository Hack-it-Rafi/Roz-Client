import PageTitle from "@/components/page-title";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import ScreenshotButton from "../screenshotButton";
import ScreenshotModal from "../ScreenshotModal";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useRef } from 'react';

const Navbar = () => {
  const account = useCurrentAccount();

  const navigate = useNavigate(); // Hook for navigation
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
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

  // Redirect function for "Looks Good"
  const handleConfirm = () => {
    setScreenshotUrl(null); // Close the modal
    navigate('/confirmation'); // Redirect to a different page
  };

  // Close the modal
  const handleClose = () => {
    setScreenshotUrl(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-4 px-20 py-4 border-b-2">
      <PageTitle title="Agents" />
      <div className="flex justify-end my-2 items-center">
        <ConnectButton />
        {account && (
          <div className="ml-4 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span>{getAccountBalance()} SUI</span>
              <img
                src="https://assets.crypto.ro/logos/sui-sui-logo.png"
                alt="SUI Logo"
                className="w-6 h-6"
              />
            </div>
            <ScreenshotButton onScreenshot={setScreenshotUrl} />
          </div>
        )}
      </div>
      <ScreenshotModal
        screenshotUrl={screenshotUrl}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Navbar;
