import { useState } from "react";
import DashNav from "../common/dashNav";
import AIJobs from "../aiJobs";
import AppliedJobs from "../appliedJobs";

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState("Home");

    const renderContent = () => {
        switch (currentPage) {
          case "AI Jobs":
            return <AIJobs></AIJobs>;
          case "Applied Jobs":
            return <AppliedJobs></AppliedJobs>;
          default:
            return <AIJobs></AIJobs>;
        }
      };

    return (
        <div>
            <DashNav onLinkClick={setCurrentPage} />
            <main className="flex-1 overflow-auto p-4">
            {renderContent()}
          </main>
        </div>
    );
};

export default Dashboard;
