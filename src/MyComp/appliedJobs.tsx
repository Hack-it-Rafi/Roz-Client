import { useState } from "react";
import OngoingJobs from "./ongoingJobs";
import RequestedJobs from "./requestedJobs";
import Chat from "@/components/chat";

const AppliedJobs = () => {
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

    if (selectedAgentId) {
        return <Chat agentId={selectedAgentId} />;
    }

    return (
        <div>
            <RequestedJobs onSelectAgent={setSelectedAgentId} />
            <OngoingJobs />
        </div>
    );
};

export default AppliedJobs;
