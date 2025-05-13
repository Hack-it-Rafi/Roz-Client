import { useState } from 'react';
import Page from '@/components/chat';
import { UUID } from '@elizaos/core';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [showChat, setShowChat] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowChat(true);
    };

    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000
    });

    const agents = query?.data?.agents;

    console.log(agents);

    if (showChat) {
        const chatContext = `Content Creation Request:
                    Job Title: ${jobTitle}
                    Job Description: ${jobDescription}

                    Please help the client with the following:
                    1. Discuss and finalize the content requirements
                    2. Establish project goals and objectives
                    3. Determine project timeline and deadlines
                    4. Discuss budget and payment terms
                    5. Provide guidance on content strategy and approach

                    Please start by introducing yourself as a content creation specialist and ask the client about their specific needs and expectations.`;
        return <Page
            agentId={agents[0].id}
            chatContext={chatContext}
            sourceComponent="home"
        />;
    }

    return (
        <div className="flex">
            <div className="flex-1 border-r-2 p-4">Part 1</div>
            <div className="flex-1 p-4">
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-4 border rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Box 1</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter job title"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full p-4 h-24 border rounded focus:ring-2 focus:ring-[#171717]"
                                    placeholder="Enter text"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
