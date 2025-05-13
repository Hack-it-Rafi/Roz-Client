import { useQuery } from "@tanstack/react-query";
// import { Cog } from "lucide-react";
// import PageTitle from "@/components/page-title";
// import { Button } from "@/components/ui/button";
// import { ConnectButton } from '@mysten/dapp-kit';
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
// import { NavLink } from "react-router";
// import { UUID } from "@elizaos/core";
// import { formatAgentName } from "@/lib/utils";
import Navbar from "@/MyComp/common/navbar";
// import { AppSidebar } from "@/components/app-sidebar";
import Sidebar from "@/MyComp/common/sidebar";
import Home from "@/MyComp/routes/home";
import { useState } from "react";
import Dashboard from "@/MyComp/routes/dashboard";
import SeekJobs from "@/MyComp/seekJobs";
import { PageType } from "@/types";
// import { Sidebar } from "@/components/ui/sidebar";



export default function Root() {
    const [currentPage, setCurrentPage] = useState<PageType>("Home");
    
    const query = useQuery({
      queryKey: ["agents"],
      queryFn: () => apiClient.getAgents(),
      refetchInterval: 5000,
    });
  
    const agents = query?.data?.agents;
  
    const renderContent = () => {
      switch (currentPage) {
        case "Home":
          return <Home></Home>;
        case "Dashboard":
          return <Dashboard></Dashboard>;
        case "Profile":
          return <div>Your Profile Infooooo</div>;
        case "Seek Jobs":
          return <SeekJobs></SeekJobs>;
        default:
          return <div>Page Not Found</div>;
      }
    };
  
    return (
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onLinkClick={setCurrentPage} />
          <main className="flex-1 overflow-auto p-4">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  }

export function changePage(pageName: PageType) {
  
};  
{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {agents?.map((agent: { id: UUID; name: string }) => (
                    <Card key={agent.id}>
                        <CardHeader>
                            <CardTitle>{agent?.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md bg-muted aspect-square w-full grid place-items-center">
                                <div className="text-6xl font-bold uppercase">
                                    {formatAgentName(agent?.name)}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center gap-4 w-full">
                                <NavLink
                                    to={`/chat/${agent.id}`}
                                    className="w-full grow"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full grow"
                                    >
                                        Chat
                                    </Button>
                                </NavLink>
                                <NavLink
                                    to={`/settings/${agent.id}`}
                                    key={agent.id}
                                >
                                    <Button size="icon" variant="outline">
                                        <Cog />
                                    </Button>
                                </NavLink>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div> */}
