import { useState } from "react";
import OngoingJobs from "./ongoingJobs";
import RequestedJobs from "./requestedJobs";
import Chat from "@/components/chat";

const AppliedJobs = () => {
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState<string | null>(null);

    const handleSelectAgent = (agentId: string, description: string) => {
        setSelectedAgentId(agentId);
        setJobDescription(description);
    };

    if (selectedAgentId && jobDescription) {
        const chatContext = `Job Description: ${jobDescription}`;
        return <Chat
            agentId={selectedAgentId as `${string}-${string}-${string}-${string}-${string}`}
            chatContext={chatContext}
            sourceComponent="appliedJobs"
        />;
    }

    return (
        <div>
            <RequestedJobs onSelectAgent={handleSelectAgent} />
            <OngoingJobs />
        </div>
    );
};

export default AppliedJobs;
