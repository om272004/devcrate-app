"use client"

import Header from "@/components/Header";
import Inputbox from "@/components/Inputbox";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [router, status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })

            if (response.status === 409) {
                setError("User already Exists")
            } else if (response.ok) {
                router.push('/signin');
            } else {
                setError("An error Occured. Please try again.")
            }
        } catch (e) {
            console.error("Registration failed:", e);
            setError("An error Occured. Please try again")
        }
    }

    if (status === "loading" || status === "authenticated") {
        return <div className="flex justify-center items-center min-h-screen">
            <p>
                loading...
            </p>
        </div>;
    }

    return <div>
        <Header />
        <main className="flex justify-center items-center min-h-screen bg-gray-900 text-white dark:text-gray-800 p-4 relative dark:bg-gray-300">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-500/20 dark:bg-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white dark:text-gray-900">
                        Create an Account
                    </h1>
                    <p>Already have an Account?{' '} <a href="/signin" className="font-bold text-blue-500 hover:underline">Sign In</a></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Inputbox id="name"
                        label="Name"
                        type="text"
                        placeholder="john"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={false}
                    />
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
                            aria-label="Sign Up"
                            >
                            Create an Account
                        </button>

                        <h3 className="text-center p-2">or</h3>

                    </div>
                </form>
                <div className="flex justify-between gap-x-4">
                    <button onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="w-2/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        aria-label="Github login button"
                        >
                        Sign In with Github
                    </button>
                    <button onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-2/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        aria-label="Google Login Button"
                        >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </main>
    </div>
}