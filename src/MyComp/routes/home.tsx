const Home = () => {
    return (
        <div className="flex">
            <div className="flex-1 border-r-2 p-4">Part 1</div>
            <div className="flex-1 p-4">
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-4 border rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Box 1</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter job title"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input
                                    type="text"
                                    className="w-full p-4 h-24 border rounded focus:ring-2 focus:ring-[#171717]"
                                    placeholder="Enter text"
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
