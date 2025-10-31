"use client"

import Header from "@/components/Header";
import Inputbox from "@/components/Inputbox";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard")
        }
    }, [router, status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });

        if (result?.ok) {
            router.push("/dashboard");
            router.refresh();
        } else {
            setError(result?.error || "Invalid Email or Password");
        }
    }

    if (status === "loading" || status === "authenticated") {
        return <div className="flex justify-center items-center min-h-screen">
            <p>
                Loading...
            </p>
        </div>;
    }

    return <div>
        <Header />
        <main className="flex justify-center items-center min-h-screen bg-gray-900 text-white dark:text-gray-800 p-4 relative dark:bg-gray-300">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-500/20 dark:bg-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white dark:text-gray-900">
                        Sign in to DevCrate
                    </h1>
                    <p>Don&apos;t have an Account?{' '} <a href="/register" className="font-bold text-blue-500 hover:underline">Register Now</a></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Inputbox id="email"
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />

                    <Inputbox id="password"
                        label="Password"
                        type="password"
                        placeholder="*********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center mt-4">
                            {error}
                        </p>
                    )}

                    <div className="mt-4">
                        <button type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            aria-label="Sign In button"
                            >
                            Sign In with Email
                        </button>

                        <h3 className="text-center p-2">or</h3>

                    </div>
                </form>
                <div className="flex justify-between gap-x-4">
                    <button onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="w-2/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        aria-label="Github login"
                        >
                        Sign In with Github
                    </button>
                    <button onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-2/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        aria-label="Google Login"
                        >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </main>
    </div>
}