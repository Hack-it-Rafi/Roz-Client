import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
// import Home from "./routes/home";
import Root from "./routes/altHome";
import useVersion from "./hooks/use-version";

import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});
const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('localnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
});

function App() {
    useVersion();
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
                <WalletProvider
                slushWallet={{
                    name: 'Roz',
                }}
                >
                    <div
                        className="dark antialiased"
                        style={{
                            colorScheme: "dark",
                        }}
                    >
                        <BrowserRouter>
                            <TooltipProvider delayDuration={0}>
                                <SidebarProvider>
                                    {/* <AppSidebar /> */}
                                    <SidebarInset>
                                        <div className="flex flex-1 flex-col gap-4 size-full container">
                                            <Routes>
                                                <Route path="/" element={<Root />} />
                                                <Route
                                                    path="chat/:agentId"
                                                    element={<Chat />}
                                                />
                                                <Route
                                                    path="settings/:agentId"
                                                    element={<Overview />}
                                                />
                                            </Routes>
                                        </div>
                                    </SidebarInset>
                                </SidebarProvider>
                                <Toaster />
                            </TooltipProvider>
                        </BrowserRouter>
                    </div>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}

export default App;
