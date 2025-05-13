import { useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Job } from '@/types';

const OngoingJobs = () => {
    const account = useCurrentAccount();
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

    const fetchAppliedJobs = async () => {
        if (!account?.label) return;
        const res = await axios.get(`http://localhost:3001/jobs/applied/${account.label}`);
        setAppliedJobs(res.data);
    };

    useEffect(() => {
        fetchAppliedJobs();
    }, [account]);

    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl mb-4">Ongoing Jobs</h2>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied yet.</p>
            ) : (
                <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {appliedJobs.map((job) => (
                        <div
                            key={job.id}
                            className="min-w-[250px] bg-black border border-white p-4 rounded-md flex-shrink-0"
                        >
                            <h3 className="text-lg mb-2">Job Description</h3>
                            <p className="mb-2">{job.description}</p>
                            <p className="mb-2">Posted By: <span className="text-gray-400">#{job.agent}</span></p>
                            {/* <span className="text-green-500 font-semibold">Applied</span> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OngoingJobs;