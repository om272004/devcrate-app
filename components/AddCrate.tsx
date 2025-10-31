/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Inputbox from "./Inputbox";

export function AddCrate({ title, description, image, url, onClose, onCrateAdded }: {
    title: string,
    description: string,
    image: string,
    url: string,
    onClose: () => void,
    onCrateAdded: () => void
}) {

    const [crateInfo, setCrateInfo] = useState({
        title,
        description,
        image
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            const response = await fetch('/api/crates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: crateInfo.title,
                    description: crateInfo.description,
                    image: crateInfo.image,
                    url: url
                })
            })
            if (response.status === 500) {
                setError("An error occurred. Please try again.")
            } else if (response.ok) {
                onCrateAdded();
                onClose();
            }
            setLoading(false);

        } catch (e) {
            console.error("An error occurred. Please try again.", e);
            setError("An error Occured. Please try again.")
        }
    }

    return <main className="flex justify-center w-full">
        <div className="w-2/6 bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-500/20 relative dark:bg-gray-200">
            <button type="button"
                onClick={onClose}
                className=" absolute top-2 right-8 text-gray-400 hover:text-red-500 text-3xl font-bold p-2 dark:text-gray-800"
                aria-label="close"
            >&times;</button>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold pt-2">
                    Save Your Crate
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                {crateInfo.image && (
                    <div>

                        <img src={crateInfo.image}
                            alt="Crate Preview"
                            className="rounded-4xl p-4"
                        />
                    </div>
                )}
                <Inputbox id="title"
                    label="Title"
                    placeholder="Enter title"
                    type="text"
                    value={crateInfo.title}
                    onChange={(e) => {
                        setCrateInfo(prev => ({ ...prev, title: e.target.value }))
                    }}
                    required={true}
                />

                <Inputbox id="description"
                    label="Description"
                    placeholder="Enter description"
                    type="text"
                    value={crateInfo.description}
                    onChange={(e) => {
                        setCrateInfo(prev => ({ ...prev, description: e.target.value }))
                    }}
                    required={true}
                />

                {error && (
                    <h3 className="text-red-500">{error}</h3>
                )}
                <button type="submit"
                    className="w-full h-12 bg-blue-600 text-white font-bold mt-4 rounded-xl hover:bg-blue-700 flex justify-center items-center"
                    aria-label="Save Crate"
                >{loading ? <div
                    className="w-5 h-5 animate-spin rounded-full 
                       border-2 border-solid border-white border-t-transparent"
                    role="status"
                /> : "Save Crate"}</button>
            </form>
        </div>
    </main>
}