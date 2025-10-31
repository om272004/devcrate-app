/* eslint-disable @next/next/no-img-element */

import { Crate } from "@prisma/client";
import { useState } from "react";

export function DisplayCrate({ crate, onCrateChanges }: { crate: Crate, onCrateChanges : () => void }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

   const handleDelete = async () => {
    setIsDeleting(true);
    const response = await fetch(`api/crates/${crate.id}`, {
        method : "DELETE"
    })

    if (response.ok) {
        onCrateChanges();
    } else {
        setError("An error occurred. Please try again.");
        console.error("An error occurred. Please try again.")
        setIsDeleting(false);

    }
   }
    
    return (
        <div 
            key={crate.id} 
            className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 h-full flex flex-col dark:bg-slate-200 dark:text-black dark:shadow-slate-800/20"
        >
            {crate.image && (
                
                <img 
                    src={crate.image} 
                    alt={crate.title || 'Crate image'} 
                    className="w-full h-52 object-cover rounded" 
                />
            )}

            <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-xl font-bold truncate" title={crate.title}>
                    {crate.title}
                </h1>
                
               
                <h2 className="text-gray-400 overflow-hidden line-clamp-3 flex text-sm dark:text-gray-800">
                    {crate.description}
                </h2>

                <div className="flex flex-wrap gap-2 my-4">
                        {crate.tags.map(tag => (
                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                
                <div className="flex justify-between items-center pt-2 pb-2 mt-auto">
                        <a 
                            href={crate.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                                       hover:bg-gray-300 dark:hover:bg-gray-600
                                       text-xs font-bold py-2 px-4 rounded"
                                       aria-label="Visit link"
                        >
                            Visit Link
                        </a>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsSummaryOpen(true)}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded"
                                aria-label="Get AI Summary"
                            >
                                AI Summary
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded disabled:opacity-50"
                                aria-label="Delete Crate"
                            >
                                {isDeleting ? "..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            
            {isSummaryOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
                    <div className="bg-gray-800 p-8 rounded-lg max-w-lg w-full shadow-xl relative dark:bg-gray-200">
                        <button
                            onClick={() => setIsSummaryOpen(false)}
                            className="absolute top-2 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold dark:text-gray-800"
                            aria-label="close summary"
                        >
                            &times;
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-4 dark:text-gray-900">{crate.title}</h2>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2 dark:text-blue-600">AI Summary</h3>
                        <p className="text-gray-300 dark:text-gray-600">{crate.summary}</p>
                    </div>
                </div>
            )}
        </div>
        
    );
}