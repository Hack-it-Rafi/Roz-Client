import { useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

interface Job {
    id: string;
    description: string;
    agent: string;
}

const RequestedJobs = ({ onSelectAgent }: { onSelectAgent: (agentId: string, description: string) => void }) => {
    const account = useCurrentAccount();
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000
    });

    const fetchAppliedJobs = async () => {
        if (!account?.label) return;
        const res = await axios.get(`http://localhost:5000/jobs/applied/${account.label}`);
        setAppliedJobs(res.data);
    };

    useEffect(() => {
        fetchAppliedJobs();
    }, [account]);

    const agents = query?.data?.agents;

    const getAgentIdByName = (name: string) => {
        return agents?.find((agent: { name: string; id: string }) => agent.name === name)?.id;
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl mb-4">Applied Jobs</h2>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied yet.</p>
            ) : (
                <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {appliedJobs.map((job) => {
                        const agentId = "0974624e-994e-080b-aaf3-8f727cd30e6c";
                        return (
                            <div
                                key={job.id}
                                onClick={() => agentId && onSelectAgent(agentId, job.description)}
                                className="cursor-pointer min-w-[250px] bg-black border border-white p-4 rounded-md flex-shrink-0 hover:bg-gray-800 transition"
                            >
                                <h3 className="text-lg mb-2">Job Description</h3>
                                <p className="mb-2">{job.description}</p>
                                <p className="mb-2">
                                    Posted By: <span className="text-gray-400">#{job.agent}</span>
                                </p>
                                <span className="text-green-500 font-semibold">Applied</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RequestedJobs;
