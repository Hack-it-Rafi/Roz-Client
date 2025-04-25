import { useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SeekJobs = () => {
    const account = useCurrentAccount();
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const res = await axios.get('http://localhost:5000/jobs');
        setJobs(res.data);
    };

    const applyToJob = async (jobId: any) => {
        if (!account?.label) {
            alert('Connect wallet first!');
            return;
        }

        try {
            await axios.post('http://localhost:5000/jobs/apply', {
                jobId,
                accountLabel: account.label,
            });
            alert('Successfully applied!');
        } catch (err) {
            alert('Error applying to job');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl mb-4">Seek Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-black border border-white p-4 rounded-md">
                        <h3 className="text-lg mb-2">Job Description</h3>
                        <p className="mb-2">{job.description}</p>
                        <p className="mb-4">Posted By: <span className="text-gray-400">#{job.agent}</span></p>
                        <button
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-1 rounded"
                            onClick={() => applyToJob(job.id)}
                        >
                            Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeekJobs;
