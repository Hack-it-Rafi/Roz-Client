import PageTitle from "@/components/page-title";
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

const Navbar = () => {
    // const account = useCurrentAccount();
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 items-center gap-4 px-20 py-4 border-b-2">
                <PageTitle title="Agents" />
                <div className="flex justify-end my-2">
                    <ConnectButton />
                    {/* {account && (
                    <div className="ml-4">
                        <p>Address: {account.address}</p>
                    </div>
                )} */}
                </div>
            </div>
    );
};

export default Navbar;