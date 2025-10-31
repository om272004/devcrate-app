"use client"

import Header from "@/components/Header";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Crate } from "@prisma/client";
import { DisplayCrate } from "@/components/DisplayCrate";
import { GetCrateInfo } from "@/components/GetCrateInfo";
import Loading from "@/components/Loading";

export default function DashBoard() {
    const { status } = useSession();
    const router = useRouter();

    const [crates, setCrates] = useState<Crate[]>([]);
    const [error, setError] = useState("");

    const fetchCrates = async () => {
        const response = await fetch('/api/crates');
        const data = await response.json();

        if (response.ok) {
            setCrates(data);
        } else if (!response.ok) {
            setError("Failed to load crates. Please refresh the page")
        }
    }

    useEffect(() => {
        fetchCrates();
    }, []);

    if (status == "loading") {
        return <Loading />
    }

    if (status == "unauthenticated") {
        router.push("/signin");
    }

    return <div className="bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900">
        <Header />
        
        <h1 className="text-6xl font-extrabold text-center pt-12">My Crates</h1>

        <div className=" min-h-screen">
            <div>{error}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18 p-8">
                <GetCrateInfo fetchCrates={fetchCrates} />

                {crates.map(c => (
                    <DisplayCrate crate={c}
                        key={c.id}
                        onCrateChanges={fetchCrates} />
                ))}
            </div>
        </div>
    </div>
}
