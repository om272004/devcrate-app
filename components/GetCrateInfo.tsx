import { useState } from "react";
import { AddCrate } from "./AddCrate";

export function GetCrateInfo({fetchCrates} : {fetchCrates : ()=> void}) {
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [crateInfo, setCrateInfo] = useState({
        title: "",
        description: "",
        image: ""
    })

    const scrape = async () => {
        setLoading(true);
        const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            setError("Failed to scrape. Please fill details manually")
        }

        const data = await response.json();
        setCrateInfo(prev => ({
            ...prev,
            title: data.title,
            description: data.description,
            image: data.image,
        }))

        setIsOpen(true);
        setLoading(false);
    }

    const handleCloseForm = () => {
        setIsOpen(false);
    }

    return <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 h-full dark:bg-slate-200 dark:text-black dark:shadow-slate-800/20">
            <div className="flex flex-col justify-center items-center min-h-full gap-y-8 p-8">
            <label htmlFor="url"
            className="text-4xl font-bold dark:text-gray-800">Add Crate</label>
            <input id="url"
            type="text"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 font-bold border rounded" />

        {error && (
            <h3 className="text-red-500">{error}</h3>
        )}
        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                                       hover:bg-gray-300 dark:hover:bg-gray-600
                                       text-lg font-bold py-2 px-4 rounded-lg flex justify-center items-center" 
            onClick={scrape} disabled={loading}
            aria-label="Fetch details">{loading ? <div 
            className="w-5 h-5 animate-spin rounded-full 
                       border-2 border-solid border-white border-t-transparent"
            role="status"
        /> : "Fetch Details"}</button>

        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <AddCrate title={crateInfo.title}
                    description={crateInfo.description}
                    image={crateInfo.image}
                    url={url}
                    onClose={handleCloseForm} 
                    onCrateAdded={fetchCrates}
                    />
            </div>
        )}
        </div>
    </div>
}